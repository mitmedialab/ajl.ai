ALTER TABLE annotator
  ADD age text,
  ADD gender text,
  ADD ethnicity text,
  ADD country text;

---
ALTER TABLE annotator
  drop age,
  drop gender,
  drop ethnicity,
  drop country;
