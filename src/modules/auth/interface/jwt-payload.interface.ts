import { Roles } from "src/utils/common/roles-enum";
import { TokenTypes } from "src/utils/common/token-types.enum";


export interface JwtPayload {
  userType: Roles;
  type: TokenTypes;
  email: string;
  id: string;
  roles: Roles;
}
