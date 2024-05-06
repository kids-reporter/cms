export const Divider = () => {
  return (
    <hr
      className="h-1.5 border-0 bg-no-repeat bg-transparent my-5"
      style={{
        width: 'min(var(--normal-container-max-width), 90%)',
        backgroundSize: 'auto 6px',
        backgroundPosition: 'top center',
        backgroundImage:
          'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwNCIgaGVpZ2h0PSI1IiB2aWV3Qm94PSIwIDAgMTIwNCA1IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMiAyLjYyMDEySDEyMDIiIHN0cm9rZT0iI0Q5RDlEOSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1kYXNoYXJyYXk9IjAuNSAyNiIvPgo8L3N2Zz4K")',
      }}
    />
  )
}

export default Divider
