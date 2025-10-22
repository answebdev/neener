import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'wfwums7k',
    dataset: 'production',
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
  deployment: {
    appId: 'ps9q8gyxk9eoa14eeyz4l6s1',
  },
})
// Without an appId, Sanity will always auto-update Studio to the latest available version on their channel.
// Having appId enables fine grained version selection,
// meaning you get to decide exactly which version of the Sanity Studio you want to run or deploy.
// Instead of always jumping to the newest update (which might occasionally introduce breaking changes or bugs), you can:
// pin your Studio to a stable version, test updates in a controlled way, or roll back if needed.
// To get rid of this, just remove 'deployment' block, which includes the appId.
