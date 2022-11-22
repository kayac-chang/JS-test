import { describe, test, expect } from "vitest";

describe("factory test", () => {
  type EmployeeType = {
    id: 1 | 2 | 3;
    name: "FullTime" | "MidTime" | "HalfTime";
    work_begin: string;
    work_end: string;
  };
  const employeeType: EmployeeType[] = [
    { id: 1, name: "FullTime", work_begin: "09:00:00", work_end: "17:00:00" },
    { id: 2, name: "MidTime", work_begin: "12:00:00", work_end: "21:00:00" },
    { id: 3, name: "HalfTime", work_begin: "20:00:00", work_end: "00:00:00" },
  ];

  type Employee = { id: number; name: string; type: EmployeeType["id"] };
  const employees: Employee[] = [
    { id: 1, name: "Alice", type: 2 },
    { id: 2, name: "Bob", type: 3 },
    { id: 3, name: "John", type: 2 },
    { id: 4, name: "Karen", type: 1 },
    { id: 5, name: "Miles", type: 3 },
    { id: 6, name: "Henry", type: 1 },
  ];

  type Task = { id: number; title: string; duration: number };
  const tasks: Task[] = [
    { id: 1, title: "task01", duration: 60 },
    { id: 2, title: "task02", duration: 120 },
    { id: 3, title: "task03", duration: 180 },
    { id: 4, title: "task04", duration: 360 },
    { id: 5, title: "task05", duration: 30 },
    { id: 6, title: "task06", duration: 220 },
    { id: 7, title: "task07", duration: 640 },
    { id: 8, title: "task08", duration: 250 },
    { id: 9, title: "task09", duration: 119 },
    { id: 10, title: "task10", duration: 560 },
    { id: 11, title: "task11", duration: 340 },
    { id: 12, title: "task12", duration: 45 },
    { id: 13, title: "task13", duration: 86 },
    { id: 14, title: "task14", duration: 480 },
    { id: 15, title: "task15", duration: 900 },
  ];

  const find_type_by_id = (employeeType: EmployeeType[]) => (id: number) =>
    employeeType.find((employee) => id === employee.id);

  function parse_hour_from_string(raw: string) {
    const matched = /(\d{2}):(\d{2}):(\d{2})/.exec(raw);
    if (!matched) throw new Error(`can not parse ${raw} with time format`);

    const hour = Number(matched.at(1)!);
    if (hour === 0) return 24;
    return hour;
  }

  // @implement
  function total_working_hours(
    employees: Employee[],
    employeeType: EmployeeType[]
  ): number {
    const find_by_id = find_type_by_id(employeeType);

    return employees.reduce((total, employee) => {
      const working_type = find_by_id(employee.type);
      if (!working_type)
        throw new Error(`working type not found ${employee.type}`);

      const working_hour =
        parse_hour_from_string(working_type.work_end) -
        parse_hour_from_string(working_type.work_begin);

      return total + working_hour;
    }, 0);
  }

  // ***issue***
  // 1. the original answer maybe wrong
  // 2. what the meaning about *count total hours worked in 1 day* ? Is it mean *how many working hours per day* ?
  test(`4. Count total hours worked in 1 day ?`, () => {
    expect(total_working_hours(employees, employeeType)).toBe(42);
  });

  // @implement
  function count_employees_when(hour: number): number {
    const find_by_id = find_type_by_id(employeeType);

    return employees.filter((employee) => {
      const working_type = find_by_id(employee.type);
      if (!working_type)
        throw new Error(`working type not found ${employee.type}`);

      const begin = parse_hour_from_string(working_type.work_begin);
      const end = parse_hour_from_string(working_type.work_end);

      return hour >= begin && end >= hour;
    }).length;
  }

  // ***issue***
  // 1. make a function that take *an argument* dayTime and return number of *employees working at that moment*
  // 2. what the meaning about *dayTime* ? dayTime meaning 白天 which is not make any sense at here.
  // 3. which data type of dayTime should be ?
  test(`5. Make a function that take as parameters dayTime and return number of employee working`, () => {
    expect(count_employees_when(10)).toBe(2);
  });

  // @implement
  function working_days(tasks: Task[]): number {
    const working_hours =
      tasks
        //
        .map((task) => task.duration)
        .reduce((sum, min) => sum + min, 0) / 60;

    const working_hours_per_day = total_working_hours(employees, employeeType);

    return Math.ceil(working_hours / working_hours_per_day);
  }

  // ***issue***
  // 1. to finish all the tasks, how many days should be take ?
  test(`6. How many days of work needed to done all tasks ?`, () => {
    expect(working_days(tasks)).toBe(2);
  });
});
