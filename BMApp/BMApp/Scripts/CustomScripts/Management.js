$(function () {   
    var viewModel = function(){
        self.Showme = ko.observable('this is an observable');
        self.Emp1 = ko.observableArray();      
        //self.Emp1.push(
        //    { Name: ko.observable('John Doe'), Tel: '347566998', Email: 'John@gmail.com' },
        //    { Name: ko.observable('Carry smith'), Tel: '347566998', Email: 'John@gmail.com' },
        //    { Name: ko.observable('Sam George'), Tel: '347566998', Email: 'John@gmail.com' },
        //    { Name: ko.observable('John Doe'), Tel: '347566998', Email: 'John@gmail.com' },
        //    { Name: ko.observable('Carry smith'), Tel: '347566998', Email: 'John@gmail.com' },
        //    { Name: ko.observable('Sam George'), Tel: '347566998', Email: 'John@gmail.com' },
        //    { Name: ko.observable('John Doe'), Tel: '347566998', Email: 'John@gmail.com' },
        //    { Name: ko.observable('Carry smith'), Tel: '347566998', Email: 'John@gmail.com' },
        //    { Name: ko.observable('Sam George'), Tel: '347566998', Email: 'John@gmail.com' },
        //    { Name: ko.observable('John Doe'), Tel: '347566998', Email: 'John@gmail.com' },
        //    { Name: ko.observable('Carry smith'), Tel: '347566998', Email: 'John@gmail.com' },
        //    { Name: ko.observable('Sam George'), Tel: '347566998', Email: 'John@gmail.com' },
        //    { Name: ko.observable('John Doe'), Tel: '347566998', Email: 'John@gmail.com' },
        //    { Name: ko.observable('Carry smith'), Tel: '347566998', Email: 'John@gmail.com' },
        //    { Name: ko.observable('Sam George'), Tel: '347566998', Email: 'John@gmail.com' },
        //    { Name: ko.observable('John Doe'), Tel: '347566998', Email: 'John@gmail.com' },
        //    { Name: ko.observable('Carry smith'), Tel: '347566998', Email: 'John@gmail.com' },
        //    { Name: ko.observable('Sam George'), Tel: '347566998', Email: 'John@gmail.com' },
        //    { Name: ko.observable('John Doe'), Tel: '347566998', Email: 'John@gmail.com' },
        //    { Name: ko.observable('Carry smith'), Tel: '347566998', Email: 'John@gmail.com' },
        //    { Name: ko.observable('Sam George'), Tel: '347566998', Email: 'John@gmail.com' },
        //    { Name: ko.observable('John Doe'), Tel: '347566998', Email: 'John@gmail.com' },
        //    { Name: ko.observable('Carry smith'), Tel: '347566998', Email: 'John@gmail.com' },
        //    { Name: ko.observable('Sam George'), Tel: '347566998', Email: 'John@gmail.com' }
        //    );
        self.AddEmployee = ko.observable("");
        self.AddTel = ko.observable("");
        self.AddEmail = ko.observable("");

        var url = "http://www.filltext.com/?callback=?";
        $.getJSON(url, {
            'rows': 100,
            'id':'{number}',
            'Name': '{firstName}',
            'Tel': '{phone}',
            'Email': '{email}'
        })
        .success(function (data) {           
            for (var i = 0; i < data.length; i++)
            {
                self.Emp1.push({ Name: ko.observable(data[i].Name), Tel: ko.observable(data[i].Tel), Email: ko.observable(data[i].Email) });
                self.employeeResult.push({ Name: ko.observable(data[i].Name), Tel: ko.observable(data[i].Tel), Email: ko.observable(data[i].Email) });
            }
        });
        self.employeeResult = ko.observableArray();
        self.query = ko.observable('');
        //Remove employee
        self.removeEmp = function (data, event) {
           
            alert();
        }

        //compares strings from name with the text just entered in the textbox
        var stringStartsWith = function (string, startsWith) {
            string = string || "";
            if (startsWith.length > string.length)
                return false;
            return string.substring(0, startsWith.length) === startsWith;
        };
        //query filtering
        self.query.subscribe(function (keys) {
            var myArray = self.Emp1();
            var Result = myArray.filter(function (value, index, array)
            {
                var returnedvalue = stringStartsWith(array[index].Name().toLowerCase(), keys.toLowerCase());
                if (returnedvalue) { return array[index]; }
            });
            self.employeeResult(Result);
        });
        //=============================================================================================
        // new Employee
            self.AddNewEmployee = function () {       
                 self.employeeResult.push({
                     Name:  ko.observable(self.AddEmployee()),
                     Tel:  ko.observable(self.AddTel()),
                     Email:  ko.observable(self.AddEmail())
                 });
                 self.Emp1.push({
                     Name:  ko.observable(self.AddEmployee()),
                     Tel:  ko.observable(self.AddTel()),
                     Email:  ko.observable(self.AddEmail())
                 });

                 self.AddEmployee('');
                Tel:  self.AddTel('');
                Email: self.AddEmail('');
            }
      ////load 
      //  self.LoadPermissions = function () {
      //      $.ajax({
      //          type:"GET",
      //          url: "/Management/LoadPermissions/",
      //          datatype: "json",
      //          success: function (returnPermissions) {
      //              var Permissions = JSON.stringify(returnPermissions.Data);  
      //          }               
      //      });
      //  }
        //  self.LoadPermissions();

        //Setting Company
            self.CompanyName = ko.observable();
            self.CompanyAddress = ko.observable();

            self.AddCompany = function () {

                compantlist.push({
                    'id': ko.observable(self.CompanyName()),
                    'Name': ko.observable('Brandon'),
                    'Address': ko.observable(self.CompanyAddress())
                });
               //self.Companies.removeAll();
               //self.Companies(compantlist);


             
                    $('#managementtable').find('thead tr').each(function () {
                        $(this).find('td:last').after('<td>' + self.CompanyAddress() + '</td>');
                    });

                    $('#managementtable').find('tbody tr').each(function () {
                        $(this).find('td:last').after('<td><div class="checkbox" > <label class="checkPermission"> <input type="checkbox" > Add Permission </label></div></td>');
                    });
               




            }


       
        //Adding company column on the table
            var compantlist = [
                { 'id': ko.observable('1'), 'Name': ko.observable('Brandon'), 'Address': ko.observable('1411 Broadway New York, NY 10018') },
                { 'id': ko.observable('2'), 'Name': ko.observable('LTD & Corp'), 'Address': ko.observable('1412 Broadway New York, NY 10018') },
                { 'id': ko.observable('3'), 'Name': ko.observable('Realty Properties'), 'Address': ko.observable('1413 Broadway New York, NY 10018') },
                { 'id': ko.observable('4'), 'Name': ko.observable('Simon LTD'), 'Address': ko.observable('1440 Broadway New York, NY 10018') },
                 { 'id': ko.observable('2'), 'Name': ko.observable('LTD & Corp'), 'Address': ko.observable('1412 Broadway New York, NY 10018') },
                { 'id': ko.observable('3'), 'Name': ko.observable('Realty Properties'), 'Address': ko.observable('1413 Broadway New York, NY 10018') },
                { 'id': ko.observable('4'), 'Name': ko.observable('Simon LTD'), 'Address': ko.observable('1440 Broadway New York, NY 10018') },
                { 'id': ko.observable('5'), 'Name': ko.observable('Pointer Realty'), 'Address': ko.observable('1375 Broadway New York, NY 10018') },
            ];

            self.Companies = ko.observableArray(compantlist);

            loaddata();
            function loaddata()
            {
                for (var i = 0; i < self.Companies().length; i++) {
                    $('#managementtable').find('thead tr').each(function () {

                        $(this).find('td:last').after('<td>' + compantlist[i].Address() + '</td>');
                    });

                    $('#managementtable').find('tbody tr').each(function () {

                        $(this).find('td:last').after('<td><div class="checkbox" > <label class="checkPermission"> <input type="checkbox" > Add Permission </label></div></td>');
                    });
                }
            }
           
           


     

    }
    ko.applyBindings(viewModel);

   




   
   
});