
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace BMApp.Workers
{
    public class XMLDocumentWorker
    {
        public void creatingXMLDoc() {

            XDocument XDoc = new XDocument(
                new XDeclaration("1.0", "utf-8", "yes"),
                new XComment("creating xml document"),
                new XElement("Student", new XAttribute("Id", 101),
                    new XElement("Name","Dioscar"),
                    new XElement("Tel","3472009415"),
                    new XElement("Email","Dioscarr@gmail.com"),

                    
                    )

                    
                    
                    )

                );
        
        }

    }
}