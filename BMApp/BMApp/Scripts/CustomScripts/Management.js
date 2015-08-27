$(function () {   
    var viewModel = function(){

      
          
       



        self.Showme = ko.observable('this is an observable');
        self.Emp1 = ko.observableArray();      
        //self.Emp1.push(
        //    { Name: ko.observable('John Doe'), Tel: '347566998', Email: 'John@gmail.com' },
        //    { Name: ko.observable('Carry smith'), Tel: '347566998', Email: 'John@gmail.com' },
        //    { Name: ko.observable('Sam George'), Tel: '347566998', Email: 'John@gmail.com' },
        //    //{ Name: ko.observable('John Doe'), Tel: '347566998', Email: 'John@gmail.com' },
        //    //{ Name: ko.observable('Carry smith'), Tel: '347566998', Email: 'John@gmail.com' },
        //    //{ Name: ko.observable('Sam George'), Tel: '347566998', Email: 'John@gmail.com' },
        //    //{ Name: ko.observable('John Doe'), Tel: '347566998', Email: 'John@gmail.com' },
        //    //{ Name: ko.observable('Carry smith'), Tel: '347566998', Email: 'John@gmail.com' },
        //    //{ Name: ko.observable('Sam George'), Tel: '347566998', Email: 'John@gmail.com' },
        //    //{ Name: ko.observable('John Doe'), Tel: '347566998', Email: 'John@gmail.com' },
        //    //{ Name: ko.observable('Carry smith'), Tel: '347566998', Email: 'John@gmail.com' },
        //    //{ Name: ko.observable('Sam George'), Tel: '347566998', Email: 'John@gmail.com' },
        //    //{ Name: ko.observable('John Doe'), Tel: '347566998', Email: 'John@gmail.com' },
        //    //{ Name: ko.observable('Carry smith'), Tel: '347566998', Email: 'John@gmail.com' },
        //    //{ Name: ko.observable('Sam George'), Tel: '347566998', Email: 'John@gmail.com' },
        //    //{ Name: ko.observable('John Doe'), Tel: '347566998', Email: 'John@gmail.com' },
        //    //{ Name: ko.observable('Carry smith'), Tel: '347566998', Email: 'John@gmail.com' },
        //    //{ Name: ko.observable('Sam George'), Tel: '347566998', Email: 'John@gmail.com' },
        //    //{ Name: ko.observable('John Doe'), Tel: '347566998', Email: 'John@gmail.com' },
        //    //{ Name: ko.observable('Carry smith'), Tel: '347566998', Email: 'John@gmail.com' },
        //    //{ Name: ko.observable('Sam George'), Tel: '347566998', Email: 'John@gmail.com' },
        //    //{ Name: ko.observable('John Doe'), Tel: '347566998', Email: 'John@gmail.com' },
        //    { Name: ko.observable('Carry smith'), Tel: '347566998', Email: 'John@gmail.com' },
        //    { Name: ko.observable('Sam George'), Tel: '347566998', Email: 'John@gmail.com' }
        //    );
        self.AddEmployee = ko.observable("");
        self.AddTel = ko.observable("");
        self.AddEmail = ko.observable("");

        var url = "http://www.filltext.com/?callback=?";
        $.getJSON(url, {
            'rows': 50,
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
        self.removeEmp = function (data) {
            alert(JSON.stringify(data));
        }

        var stringStartsWith = function (string, startsWith) {
            string = string || "";
            if (startsWith.length > string.length)
                return false;
            return string.substring(0, startsWith.length) === startsWith;
        };
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
      
        self.LoadPermissions = function () {
            $.ajax({
                type:"GET",
                url: "/Management/LoadPermissions/",
                datatype: "json",
                success: function (returnPermissions) {
                    var Permissions = JSON.stringify(returnPermissions.Data);  
                }               
            });
        }
        self.LoadPermissions();
    }
    ko.applyBindings(viewModel);
   
});