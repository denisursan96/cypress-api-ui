const { should, expect } = require("chai")
import * as data from '../data/employee'
import * as dataUpdated from '../data/employeeUpdated'

Cypress.config('baseUrl', 'https://dummy.restapiexample.com/api/v1')

describe('CRUD request for DUMMY api', () => {
    var idEmployee;
    it('Count all the employees that has age greater then 30 years old', () => {
        cy.request('GET', '/employees')
            .then(response => {
                expect(response.status).to.eq(200)
                var dataArray = response.body.data
                cy.log(JSON.stringify(dataArray))
                const count = dataArray.filter(obj => {
                    if (obj.employee_age > 30) {
                        return true;
                    }
                    return false;
                }).length;
                cy.log(count);
            })
    })
    it('[POST] Create a new employee into the database', () => {
        cy.request('POST', '/create', data.Employee)
            .then(response => {
                expect(response.status).to.eq(200)
                var responseEmployee = response.body.data
                cy.log(JSON.stringify(response.body.data))
                expect(responseEmployee.age).to.equal('31')
                expect(responseEmployee.name).to.equal('testName')
                expect(responseEmployee.salary).to.equal('10000')
                cy.log(responseEmployee.id)
                idEmployee = responseEmployee.id
            })
    })
    it('[PUT] Update an employee into the database', () => {
        cy.request('PUT', '/update/' + idEmployee, dataUpdated.UpdatedEmployee)
            .then(response => {
                expect(response.status).to.eq(200)
                var responseEmployee = response.body.data
                cy.log(JSON.stringify(response.body.data))
                expect(responseEmployee.age).to.equal('35')
                expect(responseEmployee.name).to.equal('updatedName')
                expect(responseEmployee.salary).to.equal('10000')
            })
    })
    it('[DELETE] Delete created employee', () => {
        cy.request('DELETE', '/delete/'+idEmployee)
            .then(response => {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))
                expect(response.body.message).to.equal('Successfully! Record has been deleted')
            })
    })
})