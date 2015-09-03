using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml.Linq;
using BMApp.Models;
using BMApp.Workers;

namespace BMApp.Controllers
{
    public class ManagementController : Controller
    {
        // GET: Management
        public ActionResult Index()
        {

            return View();
        }

        [HttpPost]
        public ActionResult SavesPermissions(List<Employee> model)
        {

            


            var path = Server.MapPath("~/App_Data/Management");
            bool resultcheck = System.IO.File.Exists(path);
            if (!resultcheck)
            {
                System.IO.File.Create(path);
            }
            bool resultcheck1 = System.IO.File.Exists(path);

            WriteToFile a = new WriteToFile();//Custom helper
            a.SerializeObject(model, path);
            var s = a.DeSerializeObject<List<Employee>>(path);
            return View();
        }

        public JsonResult LoadEmployees()
        {




            var path = Server.MapPath("~/App_Data/Management");  
            bool resultcheck = System.IO.File.Exists(path);
            if (resultcheck) 
            {
                WriteToFile a = new WriteToFile();//Custom helper
                var s = Employee.loadData();
                
                var permissions = Json(s);
                return new JsonResult { Data = permissions, JsonRequestBehavior = JsonRequestBehavior.AllowGet };            
            }           
            return new JsonResult { Data = "File Doesn't Exist", JsonRequestBehavior = JsonRequestBehavior.AllowGet };

           
        }
    }
}