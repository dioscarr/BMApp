$(function () {   
    var viewModel = function(){
        self.Showme = ko.observable('this is an observable');
        self.Emp1 = ko.observableArray();  
        self.AddEmployee = ko.observable("");
        self.AddTel = ko.observable("");
        self.AddEmail = ko.observable("");

        var url = "http://www.filltext.com/?callback=?";
        $.getJSON(url, {
            'rows': 2,
            'id':'{number}',
            'Name': '{firstName}',
            'Tel': '{phone}',
            'Email': '{email}'
        })
        .success(function (data) {           
            for (var i = 0; i < data.length; i++)
            {
                self.Emp1.push({ id: ko.observable(data[i].id), Name: ko.observable(data[i].Name), Tel: ko.observable(data[i].Tel), Email: ko.observable(data[i].Email) });
                self.employeeResult.push({ id: ko.observable(data[i].id), Name: ko.observable(data[i].Name), Tel: ko.observable(data[i].Tel), Email: ko.observable(data[i].Email) });
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
            self.employeeResult([]);
            self.employeeResult(Result);
            // setTimeout(function () { loaddata(); }, 100);
            if (initialcompCount > 0)
            {
                var i = 0;
                for (var j = 0; j < initialcompCount; j++)
                {               
                $('#managementtable').find('tbody tr').each(function ()
                {
                        $(this).find('td:last').after('<td><div class="checkbox" > <label class="checkPermission"><input type="checkbox" </label></div></td>');
                });
                }
            }
            if (Result.length > 0  ) {
                if (newcompanycount > 0) {
                    //debugger;
                    regeneratecolumns(newcompanycount, Result.length);
                }
            }
        });
        //regenerate columns
        function regeneratecolumns(numberofcolumns, foundcount) {
           
                for (var i = 0; i < numberofcolumns; i++) {
                    $('#managementtable').find('tbody tr').each(function () {
                        $(this).find('td:last').after('<td><div class="checkbox" > <label class="checkPermission"> <input type="checkbox" > Add Permission </label></div></td>');
                    }); }}       
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
                 if (initialcompCount > 0) {
                     var i = 0;
                     for (var j = 0; j < initialcompCount; j++) {
                         $('#managementtable').find('tbody tr:last').each(function () {                                                     
                             $(this).find('td:last').after('<td><div class="checkbox" > <label class="checkPermission"><input type="checkbox" </label></div></td>');
                         });
                     }
                 }
                 if (newcompanycount > 0) {
                     regeneratelasttrcolumns(newcompanycount);
                 }
                 self.AddEmployee('');
                Tel:  self.AddTel('');
                Email: self.AddEmail('');
            }
        //regenerate last row columns
            function regeneratelasttrcolumns(numberofcolumns) {
                debugger;
                for (var i = 0; i < numberofcolumns; i++) {
                    $('#managementtable').find('tbody tr:last').each(function () {
                        $(this).find('td:last').after('<td><div class="checkbox" > <label class="checkPermission"> <input type="checkbox" > Add Permission </label></div></td>');
                    });}}

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
                        $(this).find('td:last').after('<td><div class="checkbox" > <label class="checkPermission"><input type="checkbox" > Add Permission </label></div></td>');
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
                for (var i = 0; i < self.Companies().length; i++) {
                    //debugger;   
                    $('#managementtable').find('thead tr').each(function () {
                        $(this).find('td:last').after('<td>' + self.compantlist[i].id + '</td>');
                    });

                    $('#managementtable').find('tbody tr').each(function () {
                        $(this).find('td:last').after('<td><div class="checkbox"  > <label class="checkPermission"  ><input type="checkbox" class="checkperm" data-bind="click:insertpermission"  data-AccessID="' + self.compantlist[i].id + '">Access </label></div></td>');
                    });
                }
                           
                for (var i = 0; i < empR.length; i++)
                {

                    
                    empR[i].id();
                }
            }
        //permission
            self.permissions = ko.observableArray([]);
            self.perm = ko.observable(false);
            var lastselectedpermID = ""
            $(document).on("click", ".checkperm", function (data,event) {               
                lastselectedpermID = $(this).attr('data-AccessID'); //permission ID
                if($(this).is(':checked')){ self.perm(true); }
                else if ($(this).not(':checked')){self.perm(false);}
            });
            self.perm.subscribe(function (value) {
                alert('about to insert values ' + value);
            });
    }
    ko.applyBindings(viewModel);



    $(document).ready(function () {

        

            


       

    })
  

});