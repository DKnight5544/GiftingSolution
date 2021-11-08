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
            ViewBag.MSG = "";
            ViewBag.CurrentPage = "HOME";

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

                else if (id.Contains("tid|"))
                {
                    var arr = id.Split('|');

                    string userName = arr[1];
                    string transId = arr[2];

                    if (transId.Length == 17)
                    {
                        var msg = c.AddBadge(transId, userName).SingleOrDefault();
                        if(msg.Column1 == 'D')
                        {
                            ViewBag.MSG = "Duplicate Transaction ID";
                            ViewBag.CurrentPage = "BADGES02";
                            user = c.GetUser(userName).SingleOrDefault();
                            return View(user);
                        }
                    }

                    else
                    {
                        ViewBag.MSG = "Invalid Transaction ID";
                        ViewBag.CurrentPage = "BADGES02";
                        user = c.GetUser(userName).SingleOrDefault();
                        return View(user);
                    }

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