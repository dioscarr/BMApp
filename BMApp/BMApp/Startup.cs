using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(BMApp.Startup))]
namespace BMApp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
