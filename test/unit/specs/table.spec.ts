import { VueTsTable, ColumnOptions } from "@/components/table";
import { mount } from "@vue/test-utils";
import { stub } from "sinon";

const columns: Array<ColumnOptions> = [
  {
    label: "Name",
    field: "name"
  },
  {
    label: "Age",
    field: "age",
    type: "number"
  }
];

const rows = [
  { name: "John", age: "20" },
  { name: "Jane", age: "24" },
  { name: "Susan", age: "16" },
  { name: "Chris", age: "55" },
  { name: "Dan", age: "40" },
  { name: "John", age: "20" },
  { name: "Jane", age: "24" },
  { name: "Susan", age: "16" },
  { name: "Chris", age: "55" },
  { name: "Dan", age: "40" }
];

describe("VueTsTable", () => {
  it("should render correct contents", async () => {
    const title = "Good table";
    const sut = mount<VueTsTable>(VueTsTable, {
      propsData: {
        title: title,
        rows: rows,
        columns: columns
      }
    });
    await sut.vm.$nextTick();
    let tableRows = sut.element.querySelectorAll("tbody tr");
    tableRows.length.should.equal(rows.length);
  });

  describe("global search", () => {
    it("should render less records", async () => {
      const sut = mount<VueTsTable>(VueTsTable, {
        propsData: {
          globalSearch: true,
          rows: rows,
          columns: columns
        }
      });
      await sut.vm.$nextTick();
      let searchElt = sut.element.querySelector(".global-search-input");
      if (searchElt instanceof HTMLInputElement) {
        searchElt.value = "jo";
      } else {
        (searchElt || 0).should.be.instanceOf(HTMLInputElement);
        return;
      }
      let e = document.createEvent("HTMLEvents");
      e.initEvent("input", false, true);
      searchElt.dispatchEvent(e);
      await sut.vm.$nextTick();
      let tableRows = sut.element.querySelectorAll("tbody tr");
      tableRows.length.should.be.below(rows.length);
    });
  });

  describe("sort", () => {
    it("should call compare once per combination (touch each value once)", async () => {
      let compareSpy = stub();
      const sut = mount<VueTsTable>(VueTsTable, {
        propsData: {
          rows: rows,
          columns: columns,
          customTypes: {
            number: {
              compare: compareSpy,
              format: stub()
            }
          }
        }
      });
      await sut.vm.$nextTick();
      sut.vm.sort(1);
      await sut.vm.$nextTick();
      compareSpy.callCount.should.be.above(rows.length - 2);
    });

    it("should sort on the default by default", async () => {
      const sut = mount<VueTsTable>(VueTsTable, {
        propsData: {
          rows: rows,
          columns: columns,
          defaultSortBy: { field: "age" }
        }
      });
      await sut.vm.$nextTick();
      sut.vm.sortColumn.should.equal(1);
    });

    it("should call sort if click on first header item", async () => {
      const sut = mount<VueTsTable>(VueTsTable, {
        propsData: { rows: rows, columns: columns }
      });
      let sortSpy = stub(sut.vm, "sort");
      await sut.vm.$nextTick();
      let elt = sut.element.querySelector("thead th");
      if (elt instanceof HTMLElement) {
        elt.click();
      }
      await sut.vm.$nextTick();
      sortSpy.calledWith(0).should.equal(true);
    });

    it("should call sort if click on second header item", async () => {
      const sut = mount<VueTsTable>(VueTsTable, {
        propsData: { rows: rows, columns: columns }
      });
      let sortSpy = stub(sut.vm, "sort");
      await sut.vm.$nextTick();
      let elt = sut.element.querySelector("thead th:nth-child(2)");
      if (elt instanceof HTMLElement) {
        elt.click();
      }
      await sut.vm.$nextTick();
      sortSpy.calledWith(1).should.equal(true);
    });
  });

  async function wait(time: number) {
    return new Promise(resolve => {
      setTimeout(resolve, time);
    });
  }

  describe("filter", () => {
    it("should remove some rows when filtering", async () => {
      columns[0].filterable = true;
      const sut = mount<VueTsTable>(VueTsTable, {
        propsData: { rows: rows, columns: columns, paginated: false }
      });
      await sut.vm.$nextTick();
      let searchElt = sut.element.querySelector("input[type=search]");
      if (searchElt instanceof HTMLInputElement) {
        searchElt.value = "jo";
      } else {
        (searchElt || 0).should.be.instanceOf(HTMLInputElement);
        return;
      }
      let e = document.createEvent("HTMLEvents");
      e.initEvent("input", false, true);
      searchElt.dispatchEvent(e);
      await sut.vm.$nextTick();
      await wait(420);
      sut.element
        .querySelectorAll("tbody tr")
        .length.should.be.below(rows.length)
        .and.above(1);
    });
  });
});
