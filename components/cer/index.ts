/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
*/

// Main component (orchestrator)
export { default as CertificationShowcase } from "./CertificationShowCase";

// UI Components
export { CertificationShowcaseDesktop } from "./CertificationShowcaseDesktop";
export { CertificationShowcaseMobile } from "./CertificationShowcaseMobile";

// Logic hook
export {
  useCertificationShowcaseLogic,
  type CertificationShowcaseLogic,
} from "./CertificationShowcase.logic";
