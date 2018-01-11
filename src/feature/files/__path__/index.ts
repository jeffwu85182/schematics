
// 以下的 export 是為了方便給 app.module 以及 FeatureManager & FeatureLoader 引用
export const FeatureId = "KTBPIB.<%= classify(name) %>";

export { FeatureManager } from './feature-manager';
export { BaseLayout } from '../../components/base-layout/base-layout';
export { HandleApiCall } from '../../services/handle-api-call';
export { KtbNotification, KtbNotificationLevel } from '../../components/ktb-notification/ktb-notification';

// view models
export { <%= classify(name) %>VM } from './<%= dasherize(name) %>-vm';

// validate schemas
// export { TwdRemitQueryVMValidateSchema } from './twd-remit-detail-vm-validateschema';



