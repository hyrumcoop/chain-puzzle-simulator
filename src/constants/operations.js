export const Operations = {
  ROTATE: 0,
  INNER_SHIFT: 1,
  OUTER_SHIFT: 2,
  INVERSE_ROTATE: 3,
  INVERSE_INNER_SHIFT: 4,
  INVERSE_OUTER_SHIFT: 5,
}

export const InverseOperations = {
  [Operations.ROTATE]: Operations.INVERSE_ROTATE,
  [Operations.INNER_SHIFT]: Operations.INVERSE_INNER_SHIFT,
  [Operations.OUTER_SHIFT]: Operations.INVERSE_OUTER_SHIFT,
  [Operations.INVERSE_ROTATE]: Operations.ROTATE,
  [Operations.INVERSE_INNER_SHIFT]: Operations.INNER_SHIFT,
  [Operations.INVERSE_OUTER_SHIFT]: Operations.OUTER_SHIFT
}

const OperationMappings = {
  Symmetric: {},
  Asymmetric: {}
}

OperationMappings.Symmetric[Operations.ROTATE] = [
  23, 22, 21, 20, 19, 18, 9, 10, 11, 12, 13, 14, 15, 16, 17,
  0, 1, 2, 3, 4, 5, 6, 7, 8, 24, 25, 26, 27, 28, 29
];

OperationMappings.Symmetric[Operations.INNER_SHIFT] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 0,
  18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29
];

OperationMappings.Symmetric[Operations.OUTER_SHIFT] = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
  29, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28
];

OperationMappings.Symmetric[Operations.INVERSE_ROTATE] = [
  18, 19, 20, 21, 22, 23, 9, 10, 11, 12, 13, 14, 15, 16, 17,
  8, 7, 6, 5, 4, 3, 2, 1, 0, 24, 25, 26, 27, 28, 29,
];

OperationMappings.Symmetric[Operations.INVERSE_INNER_SHIFT] = [
  17, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
  18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29
];

OperationMappings.Symmetric[Operations.INVERSE_OUTER_SHIFT] = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
  19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 18
];

OperationMappings.Asymmetric[Operations.ROTATE] = [
  23, 22, 21, 20, 19, 18, 17, 16, 15, 6, 7, 8, 9, 10, 11, 12,
  13, 14, 0, 1, 2, 3, 4, 5, 24, 25, 26, 27, 28, 29
];

OperationMappings.Asymmetric[Operations.INNER_SHIFT] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0,
  15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29
];

OperationMappings.Asymmetric[Operations.OUTER_SHIFT] = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
  29, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28
];

OperationMappings.Asymmetric[Operations.INVERSE_ROTATE] = [
  15, 16, 17, 18, 19, 20, 21, 22, 23, 6, 7, 8, 9, 10, 11, 12,
  13, 14, 5, 4, 3, 2, 1, 0, 24, 25, 26, 27, 28, 29,
];

OperationMappings.Asymmetric[Operations.INVERSE_INNER_SHIFT] = [
  14, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
  15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29
];

OperationMappings.Asymmetric[Operations.INVERSE_OUTER_SHIFT] = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
  16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 15
];

export { OperationMappings };