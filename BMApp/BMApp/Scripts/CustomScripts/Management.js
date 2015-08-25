$(function () {
    //alert('yes');
    var viewModel = function(){
        self.Showme = ko.observable('this is an observable');

        var Employees = [
            { "Name": "John Doe" },
            { "Name": "Greg Smith" },
            { "Name": "Daniel Gutierrez" },
            { "Name": "Ken Goldsmith" },
            { "Name": "Kerry Jones" },
            { "Name": "Vanessa Williams" },
            { "Name": "John Doe" },
            { "Name": "Greg Smith" },
            { "Name": "Daniel Gutierrez" },
            { "Name": "Ken Goldsmith" },
            { "Name": "Kerry Jones" },
            { "Name": "Vanessa Williams" }]
        self.AddEmployee = ko.observable("");
        self.employeeResult = ko.observableArray(Employees);
        self.query = ko.observable('');

        self.AddNewEmployee = function () {
            Employees.push({ Name: self.AddEmployee() });
            self.employeeResult = ko.computed(function () { return Employees; });            
            self.AddEmployee('');
        }
       
        $('html').keyup(function (e) 
        {  if (e.keyCode == 8)
                self.employeeResult = ko.computed(function () { return Employees; });            
        });
        self.employeeResult = ko.computed(function () {
            var query = self.query();
            return ko.utils.arrayFilter(self.employeeResult(), function (Emp) {
                var name = Emp.Name.toLowerCase();
                return name.indexOf(query) > -1 || Emp.Name.indexOf(query) > -1;
               });
        });   
        self.LoadPermissions = function () {
            $.ajax({
                type:"GET",
                url: "/Management/LoadPermissions/",
                datatype: "json",
                success: function (returnPermissions) {
                    var Permissions = JSON.stringify(returnPermissions.Data);
                    //alert(Permissions);
                }               
            });
        }
        self.LoadPermissions();
    }
    ko.applyBindings(viewModel);
   
});