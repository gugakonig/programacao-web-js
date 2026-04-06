function transporMatriz(A) {
  console.log("Matriz original:");
  console.log(A);

  let transposta = [];

  for (let i = 0; i < A[0].length; i++) {
    transposta[i] = [];

    for (let j = 0; j < A.length; j++) {
      transposta[i][j] = A[j][i];
    }
  }

  console.log("Matriz transposta:");
  console.log(transposta);
}

let matriz = [
  [1, 2, 3],
  [4, 5, 6],
];

transporMatriz(matriz);
