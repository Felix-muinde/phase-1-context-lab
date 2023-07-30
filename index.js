// Helper function to calculate hours between two timestamps
const hoursWorked = function (timeIn, timeOut) {
    const timeInHour = parseInt(timeIn.slice(-4), 10);
    const timeOutHour = parseInt(timeOut.slice(-4), 10);
    return (timeOutHour - timeInHour) / 100;
  };
  
  const createEmployeeRecord = function (employeeData) {
    return {
      firstName: employeeData[0],
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  };
  
  const createEmployeeRecords = function (employeeData) {
    return employeeData.map(createEmployeeRecord);
  };
  
  const createTimeInEvent = function (employee, timeStamp) {
    const [date, hour] = timeStamp.split(' ');
    employee.timeInEvents.push({
      type: 'TimeIn',
      hour: parseInt(hour, 10),
      date,
    });
    return employee;
  };
  
  const createTimeOutEvent = function (employee, timeStamp) {
    const [date, hour] = timeStamp.split(' ');
    employee.timeOutEvents.push({
      type: 'TimeOut',
      hour: parseInt(hour, 10),
      date,
    });
    return employee;
  };
  
  const hoursWorkedOnDate = function (employee, date) {
    const timeInEvent = employee.timeInEvents.find((event) => event.date === date);
    const timeOutEvent = employee.timeOutEvents.find((event) => event.date === date);
    return hoursWorked(timeInEvent.hour, timeOutEvent.hour);
  };
  
  const wagesEarnedOnDate = function (employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
  };
  
  const allWagesFor = function (employee) {
    const dates = employee.timeInEvents.map((event) => event.date);
    return dates.reduce((totalWages, date) => totalWages + wagesEarnedOnDate(employee, date), 0);
  };
  
  const findEmployeeByFirstName = function (srcArray, firstName) {
    return srcArray.find((employee) => employee.firstName === firstName);
  };
  
  const calculatePayroll = function (employeeRecords) {
    return employeeRecords.reduce((totalPay, employee) => totalPay + allWagesFor(employee), 0);
  };
  