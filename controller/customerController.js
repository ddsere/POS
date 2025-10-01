import { customerArray } from "../db/database.js";
import Customer from "../model/customer.js";

const cleanForm = () => {
  $("#customer-id").val("");
  $("#customer-name").val("");
  $("#customer-address").val("");
  $("#customer-salary").val("");
};

const customer1 = new Customer("C001", "Alice", "123 Main St", 50000);
const customer2 = new Customer("C002", "Bob", "456 Oak Ave", 60000);
const customer3 = new Customer("C003", "Charlie", "789 Pine Rd", 55000);

customerArray.push(customer1, customer2, customer3);

const loadTable = () => {
  $("#customer-table-body").empty();
  customerArray.forEach((customer, index) => {
    const dataElement = `<tr>
      <td>${customer.id}</td>
      <td>${customer.name}</td>
      <td>${customer.address}</td>
      <td>${customer.salary}</td>
      <td>
        <button class="btn btn-warning btn-edit" data-index="${index}">Edit</button>
        <button class="btn btn-danger btn-delete" data-index="${index}">Delete</button>
      </td>
    </tr>`;
    $("#customer-table-body").append(dataElement);
  });
};

// Edit function
$(document).on("click", ".btn-edit", function (e) {
  const index = $(this).data("index");
  const customer = customerArray[index];

  $("#customer-modal-title").text("Edit customer");
  $("#customer-id").val(customer.id);
  $("#customer-name").val(customer.name);
  $("#customer-address").val(customer.address);
  $("#customer-salary").val(customer.salary);
  $("#edit-index").val(index);
  $("#btn-customer-save").text("Update");

  const modal = new bootstrap.Modal(
    document.getElementById("customer-form-modal")
  );
  modal.show();
});

// Delete function
$(document).on("click", ".btn-delete", function (e) {
  const index = $(this).data("index");
  customerArray.splice(index, 1);
  loadTable();
});

// Save function
$("#btn-customer-save").on("click", (e) => {
  e.preventDefault();

  const customer_id = $("#customer-id").val();
  const customer_name = $("#customer-name").val();
  const customer_address = $("#customer-address").val();
  const customer_salary = $("#customer-salary").val();
  const editIndex = $("#edit-index").val();

  //validation
  if (!customer_id || !customer_name || !customer_address || !customer_salary) {
    alert("All fields Required...!");
    return;
  }

  //regex

  const customer = new Customer(
    customer_id,
    customer_name,
    customer_address,
    customer_salary
  );

  if (editIndex === "" || editIndex === undefined) {
    // Add new customer
    customerArray.push(customer);
  } else {
    // Update existing customer
    customerArray[editIndex] = customer;
    $("#btn-customer-save").text("Save");
    $("#edit-index").val("");
    $("#customer-modal-title").text("Add customer");
  }

  loadTable();
  cleanForm();

  const modalEl = document.getElementById("customer-form-modal");
  const modal = bootstrap.Modal.getInstance(modalEl);
  modal.hide();
});

// Ensure #edit-index input exists for edit tracking
if ($("#edit-index").length === 0) {
  $("<input>", {
    type: "hidden",
    id: "edit-index",
  }).appendTo("body");
}

loadTable();
