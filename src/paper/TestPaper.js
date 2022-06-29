import { useEffect, useRef } from "react"
import Paper from "paper"
import styled from "styled-components";

const StyledCanvas = styled.canvas`
  outline: none;
  width: 100%;
  height: 100%;
`;

export default function TestCanvas() {
    let cvs = useRef()
    useEffect(()=>{
        Paper.setup(cvs.current)

        let r = new Paper.Rectangle({x: 50, y:50, width:75, height:75})
        var path = new Paper.Path();
		// Give the stroke a color
		path.strokeColor = 'black';
		var start = new Paper.Point(100, 100);
		// Move to start and draw a line from there
		path.moveTo(start);
		// Note that the plus operator on Point objects does not work
		// in JavaScript. Instead, we need to call the add() function:
		path.lineTo(start.add([ 200, -50 ]));
        path.moveTo(new Paper.Point(50, 50))
        
        Paper.project.importSVG(`<svg><g transform="
        translate(-200 45.5)
        scale(.05 0.05)">
        <path
                id="XDiv1"
                stroke="#000000"
                d="m630 0s-9.5485 12.174-4.4518 22.793 4.2226 1.5645 15.027 2.5814c10.804 1.017 9.8885 19.224 1.0427 20.247-8.8458 1.0239-11.443-4.9081-15.516 3.5064-4.0723 8.4145 13.188 34.277 8.4685 45.271-4.7192 10.994-3.2807 0.42816-14.507 0.58825-11.227 0.1601-12.238 22.39-3.5802 23.193 8.6575 0.80341 10.086-7.1144 15.362 2.2787 5.2764 9.3931 7.4461 35.198 2.9868 46.33s-3.6476 0.3802-14.854 0.66421c-11.207 0.284-11.828 23.34-2.1678 24.745 9.6601 1.4051 9.2369-10.573 13.278-2.1617 4.0412 8.4116 4.332 36.033 0.21301 47.256s-1.8429 2.0513-12.868 2.7942c-11.025 0.74284-7.7844 23.094 0.65036 23.372 8.4348 0.27816 9.6496-12.354 14.736-3.345 5.086 9.0086-10.927 36.632-6.3227 47.696s5.088 2.1815 14.962 3.5948c9.8736 1.4133 9.5823 22.122 0.27816 23.438-9.3041 1.3163-13.176-10.241-17.564-1.7567-4.388 8.4839 13.896 36.139 8.5908 46.285-5.3051 10.146-5.0189-0.31678-16.231-0.0584-11.212 0.25844-8.385 22.748 0.23679 23.497 8.6218 0.74911 10.452-8.5428 14.907-0.0339 4.4553 8.5089 5.0355 37.848-0.28483 47.921s-1.7103 1.7574-12.544 2.745c-10.834 0.98754-10.534 19.623-1.5755 20.744 8.9585 1.1205 10.533-8.4675 14.915 0.0146 4.3827 8.482 6.1235 41.233 0.80179 51.299-5.3217 10.065-3.8795-1.0667-14.674-0.0403s-11.405 20.795-2.869 21.385c8.536 0.58973 14.299-7.7081 18.385 0.7078 4.0859 8.4159 2.9073 34.846-1.6498 45.934s-3.7834-1.1086-14.01 0.24657c-10.226 1.3551-11.74 25.363-1.9878 26.775 9.7525 1.4126 8.8633-10.045 13.962-1.017 5.0991 9.0277-6.464 37.119-2.5333 48.354 3.9308 11.236 2.3814-3.6854 13.4-2.9318 11.018 0.75358 6.6517 25.735-1.8888 26.335-8.5405 0.59955-9.4427-9.0553-14.644 0.14845-5.2008 9.2037 11.108 37.397 6.0146 48.021-5.0931 10.624-1.8027-3.886-11.912-2.5014-10.11 1.3846-9.1661 22.714-0.70402 23.104 8.4621 0.39039 11.225-7.2813 15.905 1.3424 4.6806 8.6236 1.3913 38.44-3.3298 49.433s-1.1548-0.91368-11.891 0.16462c-10.737 1.0783-9.5061 20.027-1.0511 20.392 8.455 0.36494 8.8454-5.2258 13.821 3.6454 4.976 8.8711-11.858 37.352-6.5465 47.471 5.3112 10.119 6.6636-1.8875 17.872-1.612 11.209 0.27551 5.6333 21.709-2.853 22.175-8.4863 0.46659-7.5936-7.1503-11.892 1.306-4.2981 8.4563 10.165 35.961 5.5171 47-4.6478 11.039-5.676-2.0345-15.616-0.62519-9.9399 1.4093-7.3732 25.358 1.1787 25.981 8.5519 0.62333 6.4436-8.9634 11.084-0.36394 4.64 8.59-1.08 23.66-1.08 23.66"
            /></g>
      </svg>`)
        let p = new Paper.Path.Rectangle(r)
        p.strokeColor = 'black'
		// Draw the view now:
		Paper.view.draw();
    },[])
    return (
        <StyledCanvas ref={cvs} data-paper-resize="true"></StyledCanvas>
    )
}