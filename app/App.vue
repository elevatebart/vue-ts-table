<template>
  <div>
    <vue-ts-table
      :paginate="true"
      :columns="columns" 
      :rows="rows" 
      :line-numbers="true">
      <template slot="table-row-before" slot-scope="props">
        <td><input type="checkbox" /></td>
      </template>
      <template slot="table-row-after" slot-scope="props">
        <td><a class="button lightbox" :href="'#' + props.row.id" >detail</a></td>
      </template>
    </vue-ts-table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VueTsTable from "@/index";

Vue.use(VueTsTable);

export default {
  data() {
    return {
      columns: [
        {
          label: "",
          sortable: false
        },
        {
          label: "Name",
          field: "name",
          filterable: true
        },
        {
          label: "Age",
          field: "age",
          type: "number",
          html: false,
          filterable: true
        },
        {
          label: "Created On",
          field: "createdAt",
          type: "date",
          inputFormat: "YYYY-MM-DD",
          outputFormat: "MMM Do YY"
        },
        {
          label: "Percent",
          field: "score",
          type: "percentage",
          html: false,
          filterable: true,
          filterDropdown: true,
          filterOptions: [
            { value: 1, text: "Over 50" },
            { value: 2, text: "Under 50" }
          ],
          filter: function myCustomFilter(rowval: number, fil: string) {
            return (
              (fil === "1" && rowval > 0.5) || (fil === "2" && rowval <= 0.5)
            );
          }
        },
        {
          label: "",
          sortable: false,
          field: ""
        }
      ],
      rows: [
        {
          id: 1,
          name: "John",
          age: 20,
          createdAt: "201-10-31:9:35 am",
          score: 0.03343
        },
        {
          id: 2,
          name: "Jane",
          age: 24,
          createdAt: "2011-10-31",
          score: 0.03343
        },
        {
          id: 3,
          name: "Susan",
          age: 16,
          createdAt: "2011-10-30",
          score: 0.03343
        },
        {
          id: 4,
          name: "Chris",
          age: 55,
          createdAt: "2011-10-11",
          score: 0.03343
        },
        {
          id: 5,
          name: "Dan",
          age: 40,
          createdAt: "2011-10-21",
          score: 0.55343
        },
        {
          id: 6,
          name: "John",
          age: 20,
          createdAt: "2011-10-31",
          score: 0.03343
        },
        {
          id: 8,
          name: "Susan",
          age: 16,
          createdAt: "2013-10-31",
          score: 0.58343
        },
        {
          id: 9,
          name: "Chris",
          age: 55,
          createdAt: "2012-10-31",
          score: 0.03343
        },
        {
          id: 10,
          name: "Dan",
          age: 40,
          createdAt: "2011-10-31",
          score: 0.03343
        },
        {
          id: 11,
          name: "John",
          age: 20,
          createdAt: "2011-10-31",
          score: 0.03343
        },
        {
          id: 12,
          name: "Jane",
          age: 24,
          createdAt: "2011-07-31",
          score: 0.25343
        },
        {
          id: 13,
          name: "Susan",
          age: 16,
          createdAt: "2017-02-28",
          score: 0.03343
        },
        {
          id: 15,
          name: "Dan",
          age: 40,
          createdAt: "2011-10-31",
          score: 0.26343
        },
        {
          id: 19,
          name: "Chris",
          age: 55,
          createdAt: "2011-10-31",
          score: 0.03343
        },
        {
          id: 20,
          name: "Dan",
          age: 40,
          createdAt: "2011-10-31",
          score: 0.69343
        }
      ]
    };
  },
  methods: {
    onClick() {
      console.log("clicked");
    }
  }
};
</script>

