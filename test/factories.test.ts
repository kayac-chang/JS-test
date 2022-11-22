import { describe, test, expect } from "vitest";

interface Factory {
  name: string;
  employees: string[];
}

describe("factory test", () => {
  test(`1. Count Employees Number by Factory`, () => {
    const factories = [
      { name: "BR1", employees: ["John", "Alice", "Bob", "Jessie", "Karen"] },
      { name: "BR2", employees: ["Jessie", "Karen", "John"] },
      { name: "BR3", employees: ["Miles", "Eric", "Henry", "Bob"] },
      { name: "BR4", employees: [] },
    ];

    const expected = [
      { name: "BR1", count: 5 },
      { name: "BR2", count: 3 },
      { name: "BR3", count: 4 },
      { name: "BR4", count: 0 },
    ];

    // @implement
    function count_employees_by_factory(factories: Factory[]) {
      return factories.map((factory) => ({
        name: factory.name,
        count: factory.employees.length,
      }));
    }
    expect(count_employees_by_factory(factories)).toStrictEqual(expected);
  });

  test(`2. Count Factories Number by Employee`, () => {
    const factories = [
      { name: "BR1", employees: ["John", "Alice", "Bob", "Jessie", "Karen"] },
      { name: "BR2", employees: ["Jessie", "Karen", "John"] },
      { name: "BR3", employees: ["Miles", "Eric", "Henry", "Bob"] },
      { name: "BR4", employees: [] },
    ];

    const expected = [
      { employee: "John", count: 2 },
      { employee: "Alice", count: 1 },
      { employee: "Bob", count: 2 },
      { employee: "Jessie", count: 2 },
      { employee: "Karen", count: 2 },
      { employee: "Miles", count: 1 },
      { employee: "Eric", count: 1 },
      { employee: "Henry", count: 1 },
    ];

    // @implement
    function count_factories_by_employee(factories: Factory[]) {
      const map = new Map<string, number>();

      factories.forEach((factory) => {
        factory.employees.forEach((employee) => {
          if (map.has(employee)) {
            return map.set(employee, map.get(employee)! + 1);
          }

          map.set(employee, 1);
        });
      });

      return (
        Array.from(map.entries())
          //
          .map(([employee, count]) => ({ employee, count }))
      );
    }

    expect(count_factories_by_employee(factories)).toStrictEqual(expected);
  });

  test(`3. Order employees list by alphabetical order`, () => {
    const factories = [
      { name: "BR1", employees: ["John", "Alice", "Bob", "Jessie", "Karen"] },
      { name: "BR2", employees: ["Jessie", "Karen", "John"] },
      { name: "BR3", employees: ["Miles", "Eric", "Henry", "Bob"] },
      { name: "BR4", employees: [] },
    ];

    const expected = [
      { name: "BR1", employees: ["Alice", "Bob", "Jessie", "John", "Karen"] },
      { name: "BR2", employees: ["Jessie", "John", "Karen"] },
      { name: "BR3", employees: ["Bob", "Eric", "Henry", "Miles"] },
      { name: "BR4", employees: [] },
    ];

    // @implement
    function sort_employees_order_by_alpha(factories: Factory[]) {
      return factories.map((factory) => ({
        name: factory.name,
        employees: factory.employees.sort(),
      }));
    }

    expect(sort_employees_order_by_alpha(factories)).toStrictEqual(expected);
  });
});
