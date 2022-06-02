export const bodyFilter = (body: any, fields: any): {} => {
  const result = {};
  for (const field of fields) {
    if (body[field]) {
      result[field] = body[field];
    }
  }
  return result;
};

export const entityMerge = (entity: any, body: any, fields: any): boolean => {
    let updated: boolean = false;
    for (let field of fields) {
        if (body[field]) {
            entity[field] = body[field];
            updated = true;
        }
    }
    return updated;
}