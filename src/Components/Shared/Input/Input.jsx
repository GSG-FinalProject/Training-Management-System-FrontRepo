import React from 'react'

export default function Input({type='text',name,id,title,onChange,errors,onBlur,touched,disabled,colSize='col-md-6'}) {
  return (
    <>
          <div className={`form-floating mb-3  ${colSize} row justify-content-center align-items-center`}>
            
              <input type={type} className="form-control" name={name} id={id} placeholder={title}  onChange={onChange} onBlur={onBlur} disabled={disabled} />
              <label className='ps-4' htmlFor={id}>{title}</label>
              {touched[name] && errors[name] && <p className='text text-danger'> {errors[name]} </p>}
          
        </div>

    </>
  )
}
