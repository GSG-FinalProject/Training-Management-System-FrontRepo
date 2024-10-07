import React from 'react'

export default function Input({type='text',name,id,title,onChange,errors,onBlur,touched,disabled,colSize='col-md-6'}) {
  return (
    <>
          <div className={`form-floating  ${colSize} row justify-content-center align-items-center mb-3`}>
            
              <input type={type} className="form-control" name={name} id={id} placeholder={title}  onChange={onChange} onBlur={onBlur} disabled={disabled} />
              <label className='ps-4' htmlFor={id}>{title}</label>
              {touched[name] && errors[name] && <p className='text text-danger'> {errors[name]} </p>}
          
        </div>

    </>
  )
}
