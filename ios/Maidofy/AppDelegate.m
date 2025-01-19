#import "AppDelegate.h"
#import <React/RCTRootView.h>
#import "RNSplashScreen.h"  // import this

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // ...existing code...
  [RNSplashScreen show];  // add this
  return YES;
}
@end
