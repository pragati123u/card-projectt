angular.module("jobApp", [])
    .controller("jobCtrl", ["$scope", "$window", "$http", function ($scope, $window, $http) {
        // Jobs array (ONLY from DB)
        $scope.jobs = [];
        // New job model
        $scope.newJob = {
            company: "",
            role: "",
            type: "",
            level: "",
            pay: "",
            location: ""
        };
        // Modal control
        $scope.showForm = false;
        $scope.openForm = function () {
            $scope.showForm = true;
        };
        $scope.closeForm = function () {
            $scope.showForm = false;
            $scope.newJob = {
                company: "",
                role: "",
                type: "",
                level: "",
                pay: "",
                location: ""
            };
        };
        // Apply job
        $scope.applyJob = function (role) {
            $window.alert("You have applied for the role: " + role);
        };
        // FETCH JOBS FROM DATABASE 
        $http.get("http://localhost:3000/jobs")
            .then(function (response) {
            $scope.jobs = response.data; // ✅ overwrite, not concat
        })
            .catch(function (err) {
            console.error("Error fetching jobs:", err);
        });
        //  SAVE NEW JOB
        $scope.saveJob = function () {
            if (!$scope.newJob.company || !$scope.newJob.role) {
                $window.alert("Please fill at least Company and Role");
                return;
            }
            $http.post("http://localhost:3000/jobs", $scope.newJob)
                .then(function (response) {
                $scope.jobs.push(response.data); // add newly created card
                $scope.closeForm();
            })
                .catch(function (err) {
                console.error("Error saving job:", err);
            });
        };
    }]);
