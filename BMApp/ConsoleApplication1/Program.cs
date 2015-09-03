using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace ConsoleApplication1
{
      public class employee1 {
        public string ID { get; set; }
        public string Name { get; set; }
        public string Tel { get; set; }
        public string Email { get; set; }
        public string BuildingID { get; set; }

            }
    class Program
    {

        

        static void Main(string[] args)
        {
            var emp = new employee1();
            Console.WriteLine("Select -1 to exit the program ");
            Console.WriteLine("1 - Insert New Employee");
            Console.WriteLine("2 - Load all employee for specific building");
            Console.WriteLine("3 - Update");
            Console.WriteLine("4 - Show Employees by location number");
            Console.WriteLine("5 - Delete an employee");
            var option = Console.ReadLine();
            while (option.ToString() != "-1")
            {
                
                switch (option)
                {
                    case "1":
                        Console.WriteLine("Enter Full Name");
                        emp.Name = Console.ReadLine();
                        Console.WriteLine("Enter Phone Number");
                        emp.Tel = Console.ReadLine();
                        Console.WriteLine("Enter Email Address");
                        emp.Email = Console.ReadLine();
                        Console.WriteLine("Enter Building ID");
                        emp.BuildingID = Console.ReadLine();
                        Console.WriteLine("Enter Employee ID");
                        emp.ID = Console.ReadLine();

                        insertXMLData(emp);
                        Console.WriteLine("=================================");
                        Console.WriteLine("");
                        Console.WriteLine("");
                        loadData();
                        break;
                    case "2":
                        break;
                    case "3":
                        loadData();
                        var empUpdate = new employee1();
                        Console.WriteLine("");
                        Console.WriteLine("Enter ID");
                        empUpdate.ID = Console.ReadLine();
                        Console.WriteLine("Enter Update Name");
                        empUpdate.Name = Console.ReadLine();
                        updateXMLData(empUpdate);
                        loadData();
                        Console.ReadLine();

                        break;
                    case "4":
                        Console.WriteLine("Enter Location ID");
                        var location = Console.ReadLine();
                        loadDatabyLocation(location);
                        Console.ReadLine();



                        break;
                    case "5":
                        Console.WriteLine("Enter Location ID");
                        location = Console.ReadLine();
                        loadDatabyLocation(location);
                        Console.WriteLine("");
                        Console.WriteLine("Enter enployee ID to be deleted");
                        var EmpID = Console.ReadLine();
                        DeleteEmployee(EmpID);


                        



                        break;
                }
                Console.WriteLine("Select -1 to exit the program ");
                Console.WriteLine("1 - Insert New Employee");
                Console.WriteLine("2 - Load all employee for specific building");
                Console.WriteLine("3 - Update");
                Console.WriteLine("4 - Show Employees by location number");
                 option = Console.ReadLine();
                            
            }

           
        } 
        private static void insertXMLData(employee1 model)
        {
            XDocument xmlDocument = XDocument.Load(@"C:\Users\diosc_000\Source\Repos\BMApp\BMApp\ConsoleApplication1\Management");
            xmlDocument.Element("ArrayOfEmployee").AddFirst(
                new XComment("inserting new Employee"),               
                    new XElement("Employee",
                         new XElement("ID", model.ID),
                         new XElement("Name", model.Name),
                         new XElement("Tel", model.Tel),
                         new XElement("Email", model.Email),
                         new XElement("BuildingID", model.BuildingID)
                        )
                    
                );
            xmlDocument.Save(@"C:\Users\diosc_000\Source\Repos\BMApp\BMApp\ConsoleApplication1\Management");
        }
        private static void updateXMLData(employee1 model)
        {
            XDocument xmlDocument = XDocument.Load(@"C:\Users\diosc_000\Source\Repos\BMApp\BMApp\ConsoleApplication1\Management");
            var el = xmlDocument.Element("ArrayOfEmployee")
                .Elements("Employee")
                .Where(c => c.Element("ID").Value == model.ID.ToString()).FirstOrDefault();

            if (model.Name != "")
            { el.SetElementValue("Name", model.Name);}
            if (model.Tel != "")
            { el.SetElementValue("Tel", model.Tel);}
            if (model.Email != "")
            { el.SetElementValue("Email", model.Email);}









            xmlDocument.Save(@"C:\Users\diosc_000\Source\Repos\BMApp\BMApp\ConsoleApplication1\Management");
        }
        private static void loadData() { 
                  // var path = Server.MapPath("~/App_Data/Management");  
            IEnumerable<string> names = from employee in XDocument.Load(@"C:\Users\diosc_000\Source\Repos\BMApp\BMApp\ConsoleApplication1\Management")
                                        .Descendants("Employee")
                                        where (int)employee.Element("BuildingID") == 45
                                        select employee.Element("ID").Value +" " + employee.Element("Name").Value;
            foreach (string name in names){Console.WriteLine(name);} Console.ReadLine();  
        }

        private static void loadDatabyLocation(string location)
        {
            // var path = Server.MapPath("~/App_Data/Management");  
            IEnumerable<string> names = from employee in XDocument.Load(@"C:\Users\diosc_000\Source\Repos\BMApp\BMApp\ConsoleApplication1\Management")
                                        .Element("ArrayOfEmployee")
                                            .Descendants("Employee")
                                        where (int)employee.Element("BuildingID") == Convert.ToInt32(location)
                                        select employee.Element("ID").Value + " " + employee.Element("Name").Value;
            if (names == null || !names.Any())
            {
                Console.WriteLine("Error: Locations with ID: " + location + " wasn't found on the XML file");
                Console.ReadLine();

            }
            else {
                foreach (string name in names)
                {
                    Console.WriteLine(name);
                }
                Console.ReadLine();
            
            
            }
            
        }
        private static void DeleteEmployee(string EmployeeID)
        {
            // var path = Server.MapPath("~/App_Data/Management");  
            XDocument xmlDocument = XDocument.Load(@"C:\Users\diosc_000\Source\Repos\BMApp\BMApp\ConsoleApplication1\Management");
                                       
                      xmlDocument.Element("ArrayOfEmployee").Descendants("Employee").Where(c=> (int)c.Element("ID") ==Convert.ToInt32(EmployeeID)).Remove();

                      xmlDocument.Save(@"C:\Users\diosc_000\Source\Repos\BMApp\BMApp\ConsoleApplication1\Management");
                      Console.WriteLine("Employee with ID: " + EmployeeID + " has been deleted");
                      Console.ReadLine();
        }

    }
}
