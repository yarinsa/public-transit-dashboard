// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "public-transit-dashboard",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    new sst.aws.Nextjs("TransitDashboard", {
      domain: $app.stage === "production" ? "dashboard.yarinsa.me" : `${$app.stage}.dashboard.yarinsa.me`,
    });
  },
});
