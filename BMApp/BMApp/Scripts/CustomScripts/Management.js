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

       

        self.employeeResult = ko.computed(function () {
            var query = self.query();
           // alert('IN');
            return ko.utils.arrayFilter(self.employeeResult(), function (user) {
                return user.Name.indexOf(query) > -1 || user.Name.indexOf(query) > -1;
            });

           
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