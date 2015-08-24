$(function () {
    alert('yes');
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

        self.employeeResult = ko.observableArray(Employees);
        self.query = ko.observable('');
        self.query.subscribe(function (searcKey) {
            debugger;
                self.employeeResult.removeAll();

                for (var x in Employees) {
                    if (Employees[x].Name.toLowerCase().indexOf(searcKey.toLowerCase()) >= 0) {
                        self.employeeResult.push(Employees[x]);
                    }
                }


           
        });

      

        self.LoadPermissions = function () {
            $.ajax({
                type:"GET",
                url: "/Management/LoadPermissions/",
                datatype: "json",
                success: function (returnPermissions) {
                    var Permissions = JSON.stringify(returnPermissions.Data);
                    alert(Permissions);
                }               
            });
        }
        self.LoadPermissions();
    }
    ko.applyBindings(viewModel);
   
});