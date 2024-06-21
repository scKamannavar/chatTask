const USER_DETAILS_BY_EMAIL = `SELECT 
e.employee_id employeeId,
e.is_active isActive, 
r.role_id roleId, 
r.role_code roleCode,
e.business_unit_id businessUnitId
FROM employee e 
LEFT JOIN role r ON r.role_id = e.role_id
WHERE e.email_id = ?`;

const ENTITY_CODE = 'SELECT entity_code entityCode FROM entity WHERE entity_id in (?)';

const USER_RIGHTS = `SELECT 
DISTINCT CONCAT(e.entity_code,'_', rs.rights_code) rights 
FROM role_entity_rights rer 
LEFT JOIN entity_rights er ON er.entity_rights_id = rer.entity_rights_id 
LEFT JOIN entity e ON e.entity_id = er.entity_id 
LEFT JOIN rights rs ON rs.rights_id = er.rights_id 
WHERE er.entity_id IN (?) 
AND rer.role_id IN (?)`;

const USER_DETAILS_BY_USER_ID = `SELECT 
e.employee_id employeeId,
e.is_active isActive, 
e.email_id email,
r.role_id roleId, 
r.role_code roleCode
FROM employee e 
LEFT JOIN role r ON r.role_id = e.role_id
WHERE e.principle_id = ?`;

const GET_USER = 'SELECT e.employee_id userId,e.organisation_id organisationId,e.department_id departmentId,r.role_code roleCode FROM employee e LEFT JOIN role r ON r.role_id = e.role_id WHERE e.employee_id = ?';
exports.SQL = {
  USER_DETAILS_BY_EMAIL,
  ENTITY_CODE,
  USER_RIGHTS,
  USER_DETAILS_BY_USER_ID,
  GET_USER
};
