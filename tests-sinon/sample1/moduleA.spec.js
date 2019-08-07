'use strict';
const sinon = require('sinon');
const moduleA = require('./moduleA');
const moduleB = require('./moduleB');
var chai = require('chai');
var expect = chai.expect;

describe('module A tests', () => {
  it('works without spy', () => {
    expect(moduleA.DoItA()).to.be.equal("A(B)");
  });

  it('works with spy A', () => {
    const spy = sinon.spy(moduleA, 'DoItA');
    expect(moduleA.DoItA()).to.be.equal("A(B)");
    expect(spy.called).to.be.true;
    sinon.restore();
  });

  it('works with spy B', () => {
    const spy = sinon.spy(moduleB, 'DoItB');
    expect(moduleA.DoItA()).to.be.equal("A(B)");
    expect(spy.called).to.be.true;
    sinon.restore();
  });

  it('works with stub A', () => {
    const spy = sinon.stub(moduleA, 'DoItA').returns('alpha');
    expect(moduleA.DoItA()).to.be.equal("alpha");
    expect(spy.called).to.be.true;
    sinon.restore();
  });

  it('works with stub B', () => {
    const spy = sinon.stub(moduleB, 'DoItB').returns('beta');
    expect(moduleA.DoItA()).to.be.equal("A(beta)");
    expect(spy.called).to.be.true;
    sinon.restore();
  });
})