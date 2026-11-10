import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './DynamicForm.module.css';

const MIN_LENGTH = 6; // «больше 5 символов»

function DynamicForm() {
  const [submitted, setSubmitted] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  // следим за значением первого поля
  const firstField = watch('firstField', '');

  // второе поле показываем, только когда первое прошло проверку
  const showSecondField = firstField.length >= MIN_LENGTH && !errors.firstField;

  const onSubmit = (data) => {
    console.log('Данные формы:', data);
    setSubmitted(data);
    reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="firstField">
          First Field
        </label>
        <input
          id="firstField"
          className={errors.firstField ? `${styles.input} ${styles.inputError}` : styles.input}
          {...register('firstField', {
            required: 'Поле обязательно',
            minLength: {
              value: MIN_LENGTH,
              message: `Минимум ${MIN_LENGTH} символов`,
            },
          })}
        />
        {errors.firstField && <p className={styles.error}>{errors.firstField.message}</p>}
      </div>

      {showSecondField && (
        <div className={styles.field}>
          <label className={styles.label} htmlFor="secondField">
            Second Field
          </label>
          <input
            id="secondField"
            className={errors.secondField ? `${styles.input} ${styles.inputError}` : styles.input}
            {...register('secondField', {
              required: 'Поле обязательно',
            })}
          />
          {errors.secondField && <p className={styles.error}>{errors.secondField.message}</p>}
        </div>
      )}

      <button className={styles.button} type="submit">
        Submit
      </button>

      {submitted && (
        <p className={styles.success}>
          Отправлено: {submitted.firstField} / {submitted.secondField}
        </p>
      )}
    </form>
  );
}

export default DynamicForm;
