using System;
using System.Linq;
using System.Web.Mvc;
using GiftingProject.DatabaseAccess;

namespace GiftingProject.Controllers
{
    public class HomeController : Controller
    {
            public ActionResult Index(string id)
            {
                ViewBag.Title = "Gift Club";
                ViewBag.CSS = "~/Content/org.css";
                ViewBag.JS = "~/Scripts/org.js";

                id = string.IsNullOrWhiteSpace(id) ? "WIGIWIZ" : id;
                UserModel user;
                string connStr = Environment.GetEnvironmentVariable("DWKDBConnectionString");

                using (DWKDBDataContext c = new DWKDBDataContext(connStr))
                {

                    if (id.Contains("add|"))
                    {
                        var arr = id.Split('|');

                        string userName = arr[1];
                        string sponsorName = arr[2];
                        c.AddUser(sponsorName, userName);
                        return Redirect(string.Format("/{0}", userName));

                    }

                    else
                    {
                        user = c.GetUser(id).SingleOrDefault();
                        return View(user);
                    }


                }
            }
        }

}