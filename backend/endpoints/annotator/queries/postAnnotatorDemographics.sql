UPDATE annotator set
  age = ${age},
  gender = ${gender},
  ethnicity = ${ethnicity},
  country = ${country}
WHERE id = ${id};
