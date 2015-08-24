using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using BMApp.Controllers;
using BMApp.Models;
using BMApp.Workers;
using Microsoft.VisualStudio.TestTools.UnitTesting;


namespace BMApp.Tests.Controllers
{
    [TestClass]
    public class ManagementControllerTest
    {
        [TestMethod]
        public void WriteToFileTest()
        {
            //Arrange
            ManagementController MPC = new ManagementController();
            //Act
            ViewResult result = MPC.Index() as ViewResult;
         
            //assert
            Assert.IsNotNull(result);
        }      
    }
}
