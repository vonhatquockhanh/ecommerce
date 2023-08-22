import { AccessResult } from "payload/config";

export const isAdminOrCreatedBySupplier = ({ req: { user } }) => {
    // Scenario #1 - Check if user has the 'admin' role
    if (user && user.role === 'admin') {
      return true;
    }
  
    // Scenario #2 - Allow only documents with the current user set to the 'createdBy' field
    if (user) {
      // Will return access for only documents that were created by the current user
      return {
        supplierId: {
          equals: user.supplier.id,
        },
      };
    }
  
    // Scenario #3 - Disallow all others
    return false;
  };

  export const isAdminOrCreatedBySupplierProduct = ({ req: { user } }) => {
    // Scenario #1 - Check if user has the 'admin' role
    if (user && user.role === 'admin') {
      return true;
    }
  
    // Scenario #2 - Allow only documents with the current user set to the 'createdBy' field
    if (user) {
      // Will return access for only documents that were created by the current user
      return {
        supplierId: {
          equals: user.supplier.id,
        },
      };
    }
  
    // Scenario #3 - Disallow all others
    return false;
  };

  export const isAdminOrCreatedBySupplierMedia = ({ req: { user } }): AccessResult => {
    // Scenario #1 - Check if user has the 'admin' role
    if (user && user.role === 'admin') {
      return true;
    }
  
    // Scenario #2 - Allow only documents with the supplier set to the 'supplierId' field
    if (user) {
      // Will return access for only documents that were created by the supplierId or admin
      return {
        or: [
          {
            supplierId: {
              equals: user.supplier.id,
            }
          },
          {
            supplierId: {
              exists: false
            }
          }
        ]
      }
    }
  
    // Scenario #3 - Disallow all others
    return false;
  };

  export const isSupplier = ({ req: { user } }) => {
    // Scenario #1 - Check if user has the 'admin' role
    if (user && user.role === 'supplier') {
      return true;
    }
  
    // Scenario #3 - Disallow all others
    return false;
  };