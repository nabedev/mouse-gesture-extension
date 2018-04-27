console.log('myscript')

let flag = false
$(window).click(function(e) {
  let color = flag ? '#fff' : '#E4EDDB'
  flag = !flag
  $('body').css('background-color', color)
  console.log(`x: ${e.clientX}`)
})
