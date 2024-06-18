pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/CSAMM.sol";
import "./MockERC20.sol";

contract CSAMMTest is Test {
    CSAMM public csamm;
    MockERC20 public token0;
    MockERC20 public token1;
    address public alice;
    address public bob;

    function setUp() public {
        token0 = new MockERC20("Token0", "TK0", 18);
        token1 = new MockERC20("Token1", "TK1", 18);
        csamm = new CSAMM(address(token0), address(token1));
        alice = address(0x1);
        bob = address(0x2);
    }

    function testAddLiquidity() public {
        token0.mint(alice, 1000 ether);
        token1.mint(alice, 1000 ether);
        vm.startPrank(alice);
        token0.approve(address(csamm), 1000 ether);
        token1.approve(address(csamm), 1000 ether);
        uint256 shares = csamm.addLiquidity(500 ether, 500 ether);
        assertEq(shares, 1000 ether);
        assertEq(csamm.balanceOf(alice), 1000 ether);
        assertEq(csamm.totalSupply(), 1000 ether);
        assertEq(csamm.reserve0(), 500 ether);
        assertEq(csamm.reserve1(), 500 ether);
        vm.stopPrank();
    }

    function testRemoveLiquidity() public {
        token0.mint(alice, 1000 ether);
        token1.mint(alice, 1000 ether);

        vm.startPrank(alice);

        token0.approve(address(csamm), 1000 ether);
        token1.approve(address(csamm), 1000 ether);

        csamm.addLiquidity(500 ether, 500 ether);

        (uint256 amount0, uint256 amount1) = csamm.removeLiquidity(500 ether);

        assertEq(amount0, 250 ether); 
        assertEq(amount1, 250 ether); 
        assertEq(csamm.balanceOf(alice), 500 ether); 
        assertEq(csamm.totalSupply(), 500 ether); 
        assertEq(csamm.reserve0(), 250 ether); 
        assertEq(csamm.reserve1(), 250 ether); 
        vm.stopPrank();
    }

    function testSwapToken0ForToken1() public {
        token0.mint(alice, 1000 ether);
        token1.mint(alice, 1000 ether);
        vm.startPrank(alice);
        token0.approve(address(csamm), 1000 ether);
        token1.approve(address(csamm), 1000 ether);
        csamm.addLiquidity(500 ether, 500 ether);
        uint256 amountOut = csamm.swap(address(token0), 100 ether);
        assertEq(amountOut, 95 ether);
        assertEq(csamm.reserve0(), 600 ether);
        assertEq(csamm.reserve1(), 405 ether);
        vm.stopPrank();
    }

    function testSwapToken1ForToken0() public {
        token0.mint(alice, 1000 ether);
        token1.mint(alice, 1000 ether);
        vm.startPrank(alice);
        token0.approve(address(csamm), 1000 ether);
        token1.approve(address(csamm), 1000 ether);
        csamm.addLiquidity(500 ether, 500 ether);
        uint256 amountOut = csamm.swap(address(token1), 100 ether);
        assertEq(amountOut, 95 ether);
        assertEq(csamm.reserve0(), 405 ether);
        assertEq(csamm.reserve1(), 600 ether);
        vm.stopPrank();
    }
}
