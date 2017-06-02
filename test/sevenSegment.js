'use strict'

// Setting test environment
process.env.ENV = 'unitTest';

// import packages
const chai      = require('chai');
// const chaiHttp  = require('chai-http');
const request 	= require('supertest-as-promised');  
const app    	= require('../server');
const expect    = chai.expect;
const fs 		= require('fs-promise');
// chai.use(chaiHttp);


describe('Seven Segement', () => {
/*
  * Test the Sequence Functionality
  */
  describe('/api/parse', function () {
    describe('Test Cases', function () {
      const fixtures = 'test/fixtures/';
      it('User Story 1', function () {

        return request(app)
        		.post('/api/parse')
				.field('name', 'invoiceFile')
				.attach('invoiceFile', fixtures + 'input_user_story_1.txt')
				.expect(200)
				.then(function (res) {
					return fs.readFile(fixtures + 'output_user_story_1.txt','utf8')
							.then(function(data){
								expect(data).to.be.equal(res.body.data);
							});

				});
      });
      it('User Story 2', function () {

        return request(app)
        		.post('/api/parse')
				.field('name', 'invoiceFile')
				.attach('invoiceFile', fixtures + 'input_user_story_2.txt')
				.expect(200)
				.then(function (res) {
					return fs.readFile(fixtures + 'output_user_story_2.txt','utf8')
							.then(function(data){
								expect(data).to.be.equal(res.body.data);
							});

				});
      });
    });   
  });
});