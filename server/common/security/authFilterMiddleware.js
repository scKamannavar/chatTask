const config = require("config");
const DA = require("./securityDA");
const utility = require("./utility");
const { HttpUtil } = require("../../utils");

const gateway = config.get("gateway");
const security = config.get("security");
const {
  enabled = true,
  entities = {},
  defaultGrants = [],
  grants = [],
} = security;
/**
 * It will filter the request and load necessary grants
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next callback
 */
exports.authFilterMiddleware = async (req, res, next) => {
  const token = req.get("Authorization");
  // temporary
  const userId = token;
  const url = req.originalUrl.split("/");
  const entityIdx = url.indexOf(gateway.rooturl.split("/").pop()) + 1;
  let entityInfo = url[entityIdx];
  [entityInfo] = entityInfo.split("?");

  try {
    if (enabled && token && `${token}`.split(".").length > 1) {
      const chunks = `${token}`.split(".");
      const decodedData = Buffer.from(chunks[1], "base64").toString("ascii");
      const userInfo = getJson(decodedData);

      if (!userInfo) {
        res.json(HttpUtil.getUnauthorized());
        return;
      }

      let user = await DA.findUserByPrincipleId(userInfo.upn);
      if (!user) {
        throw new Error("User Not Found");
      } else {
        user = utility.processUser(user);
        const { userId, roleId, isActive = true, businessUnitId } = user;
        if (!isActive) {
          return res.json(
            HttpUtil.getAccessDenined([null, "User inactive, Contact Admin"])
          );
        }
        res.locals.email = user.email;
        res.locals.userId = userId;
        // res.locals.businessUnitId = businessUnitId;
        const { info } = req.query;
        const { method } = req;
        const entityIds = utility.getEntity(entities, entityInfo);

        const userGrants = await getGrants(roleId, entityIds, info, method);

        res.locals.grants = [...defaultGrants, ...userGrants];
      }
    } else if (!enabled) {
      res.locals.grants = [...defaultGrants, ...grants];
      const [user] = await DA.findUser(userId);
      if (user) {
        res.locals.userId = user.userId;
        res.locals.departmentId = user.departmentId;
        res.locals.organisationId = user.organisationId;
        res.locals.businessUnitId = "8c2678a9-7841-11ec-a5a7-0ad7b1b44f95";
        res.locals.roleCode = user.roleCode;
      }
    } else {
      throw new Error("Token Expired/Invalid Token");
    }
  } catch (err) {
    console.log(err);
    res.json(HttpUtil.getUnauthorized());
  }
  next();
};

const getGrants = async (
  roleId = [],
  entityIds = [],
  info = null,
  method = "GET"
) => {
  if (!entityIds || !entityIds.length) return [];

  if (info && `${info}`.toUpperCase() === "S" && method === "GET") {
    const entityCodes = await DA.findEntityCodesByEntityIds(entityIds);

    if (!entityCodes || !entityCodes.length) return [];
    return entityCodes.map((o) => `${o.entityCode}_VIEW`);
  }

  const rights = await DA.findEntityCodesByEntityIdsAndRoleIds(
    entityIds,
    roleId
  );

  if (!rights || !rights.length) return [];
  return rights.map((o) => o.rights);
};

const getJson = (user) => {
  try {
    return JSON.parse(user);
  } catch (error) {
    return null;
  }
};
