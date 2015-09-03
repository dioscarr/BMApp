using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace BMApp.Models
{
    public class Employee
    {
        public string ID { get; set; }
        public string Name { get; set; }
        public string Tel { get; set; }
        public string Email { get; set; }
        public string BuildingID { get; set; }

        public static IEnumerable<Employee> loadData()
        {
            // var path = Server.MapPath("~/App_Data/Management");  
            IEnumerable<Employee> Employeesreturned = from employee in XDocument.Load(@"C:\Users\diosc_000\Source\Repos\BMApp\BMApp\ConsoleApplication1\Management")
                                        .Descendants("Employee")
                                        where (int)employee.Element("BuildingID") == 45
                                        //select employee.Element("ID").Value + " " + employee.Element("Name").Value;
                                        select new Employee{ Name = employee.Element("Name").Value,
                                                             Email = employee.Element("Email").Value, 
                                                             BuildingID = employee.Element("BuildingID").Value,
                                                             Tel = employee.Element("Tel").Value,
                                                             ID = employee.Element("ID").Value};

            return Employeesreturned;
        
        }



    }
}