const KEYS={
    employees:'employees',
    employee:'employee',
    employeeId:'employeeId'
}

export const getDepartmentCollection = () => ([
    { id: '1', title: 'Development' },
    { id: '2', title: 'Marketing' },
    { id: '3', title: 'Accounting' },
    { id: '4', title: 'HR' },
])

export function insertEmployee(data:any){
    let employees=getAllEmployees();
    data['id']=generateEmployeeId();
    employees.push(data);
    localStorage.setItem(KEYS.employees,JSON.stringify(employees));
}

export function updateEmployee(data:any) {
    let employees = getAllEmployees();
    let recordIndex = employees.findIndex((x:any) => x.id == data.id);
    employees[recordIndex] = { ...data }
    localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}

export function deleteEmployee(id:number) {
    let employees = getAllEmployees();
    employees = employees.filter((x:any) => x.id != id)
    localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}

export function generateEmployeeId(){
    if(localStorage.getItem(KEYS.employeeId)==null){
        localStorage.setItem(KEYS.employeeId,'0')
    }
    var id=parseInt(localStorage.getItem(KEYS.employeeId)||'')
    localStorage.setItem(KEYS.employeeId,(++id).toString());
    return id;
}

export function getAllEmployees(){

    if(localStorage.getItem(KEYS.employees)==null){
        localStorage.setItem(KEYS.employees,JSON.stringify([]))      
    }
    let employees = JSON.parse(localStorage.getItem(KEYS.employees)|| '');

    //map departmentID to department title
    let departments=getDepartmentCollection();

    return employees.map((x:any)=>({
        ...x,
        department: departments[x.departmentId - 1].title
    }))
}

export function getEmployeeById(id:number){
    let employees = JSON.parse(localStorage.getItem(KEYS.employees)|| '');
    let departments=getDepartmentCollection();
    let empWithDepartment=employees.map((x:any)=>({
        ...x,
        department: departments[x.departmentId - 1].title
    }))
    let employee=empWithDepartment.filter((x:any)=>x.id==id);
    localStorage.setItem(KEYS.employee,JSON.stringify(employee[0])); 
    return employee = JSON.parse(localStorage.getItem(KEYS.employee)|| '');
}
