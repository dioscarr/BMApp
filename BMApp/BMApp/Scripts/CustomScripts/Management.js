$(function () {   
    var viewModel = function(){
        self.Showme = ko.observable('this is an observable');
        self.Emp1 = ko.observableArray();  
        self.AddEmployee = ko.observable("");
        self.AddTel = ko.observable("");
        self.AddEmail = ko.observable("");

        //var url = "http://www.filltext.com/?callback=?";
        //$.getJSON(url, {
        //    'rows': 500,
        //    'id':'{number}',
        //    'Name': '{firstName}',
        //    'Tel': '{phone}',
        //    'Email': '{email}'
        //})

        $.ajax({
            type: "GET",
            url: "/management/LoadEmployees",
            datatype: "json",
            success: function (returned) {
                var returnresult = JSON.stringify(returned.Data);
                var data = JSON.parse(returnresult)
                
                for (var i = 0; i < data.length; i++) {
                    self.Emp1.push({ id: ko.observable(data[i].ID), Name: ko.observable(data[i].Name), Tel: ko.observable(data[i].Tel), Email: ko.observable(data[i].Email) });
                    self.employeeResult.push({ id: ko.observable(data[i].ID), Name: ko.observable(data[i].Name), Tel: ko.observable(data[i].Tel), Email: ko.observable(data[i].Email) });
                }
            }
        });
        self.employeeResult = ko.observableArray();
        self.query = ko.observable('');
        //Remove employee
        self.removeEmp = function (data) {
            var a = ko.toJS(data);
            var s = JSON.stringify(a);
            alert(s);
        }
       
        //regenerate columns
        function regeneratecolumns(numberofcolumns, foundcount) {
           
            for (var i = 0; i < numberofcolumns; i++) {
                $('#managementtable').find('tbody tr').each(function () {
                    $(this).find('td:last').after('<td><div class="checkbox" > <label class="checkPermission"> <input type="checkbox" class="checkperm" data-PermID="" >Access</label></div></td>');
                }); }}       
        //=============================================================================================
        // new Employee
        var ids = 0;

        self.AddNewEmployee = function () {
            Employee.model.push({
                "ID": ids,
                "Name": self.AddEmployee(),
                "Tel": self.AddTel(),
                "Email": self.AddEmail(),
                "BuildingID": "45"

            });
          

            ids++;

            self.employeeResult.push({
                id: ko.observable('225'),
                Name:  ko.observable(self.AddEmployee()),
                Tel:  ko.observable(self.AddTel()),
                Email:  ko.observable(self.AddEmail())
            });
            self.Emp1.push({
                id: ko.observable('225'),
                Name:  ko.observable(self.AddEmployee()),
                Tel:  ko.observable(self.AddTel()),
                Email:  ko.observable(self.AddEmail())
            });
            if (initialcompCount > 0) {
                //var empR = self.employeeResult();
                //var k = 0;
                //if (k > empR.length - 1) { k = 0; }
                var i = 0;
                for (var j = 0; j < initialcompCount; j++) {
                    $('#managementtable').find('tbody tr:last').each(function () {
                        //$(this).attr("data-EmpID", empR[k].id());
                        $(this).find('td:last').after('<td><div class="checkbox" > <label class="checkPermission"><input type="checkbox" class="checkperm" data-PermID=""> Access</label></div></td>');
                    });
                    //k++;
                }
            }
            if (newcompanycount > 0) {
                regeneratelasttrcolumns(newcompanycount);
            }

            $('#managementtable').find('tbody tr').each(function () {
                debugger;
                $(this).find('td').each(function () {
                    $(this).find('.checkperm').attr('data-PermID', "yey");

                })
            });




            self.AddEmployee('');
            Tel:  self.AddTel('');
            Email: self.AddEmail('');
        }
        //regenerate last row columns
        function regeneratelasttrcolumns(numberofcolumns) {
            debugger;
            for (var i = 0; i < numberofcolumns; i++) {
                $('#managementtable').find('tbody tr:last').each(function () {
                    $(this).find('td:last').after('<td><div class="checkbox" > <label class="checkPermission" > <input type="checkbox" class="checkperm" data-PermID="">Access</label></div></td>');
                });}}

        //load 

        var Employee = {"model":[]};
          

           //JSON.stringify(Employee)
        
           self.insertEmployees = function () {         
            $.ajax({
                type: "Post",
                data: Employee,
                url: "/Management/SavesPermissions/",
                datatype: "json",
                success: function (returnPermissions) {
                    var Permissions = JSON.stringify(returnPermissions.Data);
                    alert(Permissions);
                }               
            }).done(function(){
            Employee = {"model":[]};
            
            });
           }
       
       

        //Setting Company
            self.CompanyName = ko.observable();
            self.CompanyAddress = ko.observable();
            self.newListOfComp = ko.observableArray([]);
            var newcompanycount = 0;
            self.AddCompany = function () {                
                newcompanycount = newcompanycount + 1;//keep track of number of new company created but not yet logged into database.
                self.newListOfComp.push({
                        'id': ko.observable(),
                        'Name': ko.observable(self.CompanyName()),
                        'Address': ko.observable(self.CompanyAddress())
                });
                    $('#managementtable').find('thead tr').each(function () {
                        $(this).find('td:last').after('<td>' + self.CompanyAddress() + '</td>');
                    });
                    $('#managementtable').find('tbody tr').each(function () {
                       
                        $(this).find('td:last').after('<td><div class="checkbox" > <label class="checkPermission"><input type="checkbox" class="checkperm" data-PermID="" > Add Permission </label></div></td>');
                    }); }
        //Adding company column on the table
            self.compantlist = [];
            var initialcompCount = 0;
            self.compList = ko.observableArray([]);
            var CompUrl = "http://www.filltext.com/?callback=?";
        $.getJSON(CompUrl, {
                'rows': 5,
                'id': '{number}',
                'Name': '{business}',
                'Address': '{streetAddress}'
            })
            .success(function (data) {               
                var s = JSON.stringify(data);
                for (var i = 0; i < data.length; i++) {
                    // alert(data[i].Name)
                    self.compantlist.push({ id: data[i].id, Name: data[i].Name, Address: data[i].Address });
                    self.compList().push({id: data[i].id, Name: data[i].Name, Address: data[i].Address});                    
                }
                initialcompCount = self.compList().length;
            });
        self.Companies = ko.observableArray(self.compList());
        self.justtext = ko.observable('dx');
        //time out to wait for employee column to load. it is needed because permission are constructed base on Emp and locations
        setTimeout(function () { loaddata(); }, 400);
            function loaddata()
            {
                // alert(self.Companies().length)
                var empR = self.employeeResult();
                var k = 0;
                for (var i = 0; i < self.Companies().length; i++) {
                    //debugger;   
                    $('#managementtable').find('thead tr').each(function () {
                        $(this).find('td:last').after('<td data-buildingID = "' + self.compantlist[i].id + '">' + self.compantlist[i].Name + '</td>');
                    });
                    if (k > empR.length-1) {k = 0;}                   
                    $('#managementtable').find('tbody tr').each(function () {    
                        $(this).attr("data-EmpID",  empR[k].id() );
                        $(this).find('td:last').after('<td ><div class="checkbox"  > <label class="checkPermission"  ><input type="checkbox" class="checkperm" data-bind="click:insertpermission" data-PermID="" data-AccessID="' + self.compantlist[i].id + '">Access </label></div></td>');
                        k++;
                    });
                }
            }
        //permission
            self.objPermissions = ko.observableArray([]);
            self.perm = ko.observable(false);          

            $(document).on("click", ".checkperm", function (data, event) {
                //alert('click');
                var currentE = $(this);
                var currentTDIndex = $(this).closest('td').index();               

                var selectedCompID = $(this).closest('table').find('thead td').eq(currentTDIndex).attr("data-buildingID");//location ID
                var selectedEmpID = $(this).closest('tr').attr("data-empid");//Employee ID                   
              
                if ($(this).is(':checked')) {
                    self.perm(true);
                    $(this).closest('tr').find('td:first').addClass("Empselectchk");
                    $(this).closest('table').find('thead td').eq(currentTDIndex).addClass("Empselectchk");
                    //setting up permission Object
                    var d = new Date(); // for now
                    d.getHours(); // => 9
                    d.getMinutes(); // =>  30
                    d.getSeconds(); // => 51

                    self.objPermissions.push({
                        EmployeeID: selectedEmpID,
                        LocationID: selectedCompID,
                        PermissionID: selectedCompID + selectedEmpID 
                                            });

                    alert(JSON.stringify(self.objPermissions()));

                }
                else if ($(this).not(':checked')) {
                    self.perm(false);
                    $(this).closest('tr').find('td:first').removeClass("Empselectchk");
                    $(this).closest('table').find('thead td').eq(currentTDIndex).removeClass("Empselectchk");
                    
                    var result = self.objPermissions().filter(function (el) {
                        return el.PermissionID !== selectedCompID + selectedEmpID;
                    });
                    self.objPermissions(result);
                    alert(JSON.stringify(self.objPermissions()));
                }
            });
            //self.perm.subscribe(function (value) {
            //    alert('about to insert values ' + value);
        //});


        //test search
        //==============================================================================================================================

        $("#searchbar").keyup(function () {
                //split the current value of searchInput
                var data = this.value.split(" ");
                //create a jquery object of the rows
                var jo = $("#fbody").find("tr");
                if (this.value == "") {
                    jo.show();
                    return;
                }
                //hide all the rows
                jo.hide();

                //Recusively filter the jquery object to get results.
                jo.filter(function (i, v) {
                    var $t = $(this);
                    for (var d = 0; d < data.length; ++d) {
                        if ($t.is(":contains('" + data[d] + "')")) {
                            return true;
                        }
                    }
                    return false;
                })
                //show the rows that match.
                .show();
            }).focus(function () {
                this.value = "";
                $(this).css({
                    "color": "black"
                });
                $(this).unbind('focus');
            }).css({
                "color": "#C0C0C0"
            });
    }
    ko.applyBindings(viewModel);



    $(document).ready(function () {

      

            


       

    })
  

});