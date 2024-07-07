console.log("Skrypt załadowany");

function ProstyTest() {
  return React.createElement('div', null, 'Test React - jeśli to widzisz, React działa!');
}

ReactDOM.render(
  React.createElement(ProstyTest),
  document.getElementById('svg-container')
);

console.log("Renderowanie zakończone");