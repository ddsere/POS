import { customerArray } from "../db/database.js";
import Customer from "../model/customer.js";

const cleanForm = () => {
  $("#customer-id").val("");
  $("#customer-name").val("");
  $("#customer-address").val("");
  $("#customer-salary").val("");
};

const loadTable = () => {
  $("#customer-table-body").empty();
  customerArray.forEach((customer, index) => {
    const dataElement = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.salary}</td></tr>`;
    $("#customer-table-body").append(dataElement);
  });
};

$("#btn-customer-save").on("click", (e) => {
  e.preventDefault();

  const customer_id = $("#customer-id").val();
  const customer_name = $("#customer-name").val();
  const customer_address = $("#customer-address").val();
  const customer_salary = $("#customer-salary").val();

  //regex

  //customer_array.length +1 - new id

  const customer = new Customer(
    customer_id,
    customer_name,
    customer_address,
    customer_salary
  );

  customerArray.push(customer);

  loadTable();
  cleanForm();
});

loadTable();
