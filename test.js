// Código de prueba que será utilizado para ser analizado con SonarQube
function testFunction() {
    let x = 10;
    let y = 20;

    // Esta línea tiene un comentario que no es útil
    console.log("El valor de x es: " + x); // Comentario redundante

    // Aquí hay una condición que siempre es verdadera
    if (x < 15) {
        console.log("x es menor que 15");
    }

    // Esta función no se utiliza en ninguna parte del código
    function unusedFunction() {
        return "Esta función nunca se llama";
    }

    // Llamada a la función unusedFunction, lo cual es innecesario
    unusedFunction();
}
