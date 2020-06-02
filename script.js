const masterCheck = document.getElementById('master-check');
const container = document.querySelector('#checks-list');
const list = container.querySelectorAll('input');

function CheckSubject() {
  this.observers = [];
}

CheckSubject.prototype.subscribe = function (fn) {
  this.observers.push(fn);
};

CheckSubject.prototype.unsubscribe = function (fn) {
  this.observers.filter((obs) => obs !== fn);
};

CheckSubject.prototype.trigger = function (value) {
  const self = this;
  this.observers.forEach(function (fn) {
    fn.call(self, value);
  });
};

function shaqAllMyInputs(value) {
  const shaqs = Array.prototype.slice.call(list);

  shaqs.forEach(function (shaq) {
    shaq.checked = value;
  });
}

const shaqsObs = new CheckSubject();

shaqsObs.subscribe(shaqAllMyInputs);

masterCheck.addEventListener('click', function (e) {
  shaqsObs.trigger(e.target.checked);
});
