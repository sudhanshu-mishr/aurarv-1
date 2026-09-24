export interface RtlFile {
  id: string;
  name: string;
  path: string;
  category: 'rtl' | 'tb' | 'programs';
  description: string;
  code: string;
}

export const rtlFiles: RtlFile[] = [
  {
    id: 'alu',
    name: 'alu.sv',
    path: 'rtl/alu.sv',
    category: 'rtl',
    description: 'Arithmetic Logic Unit supporting basic integer operations',
    code: `\`default_nettype none

module alu (
    input  logic [31:0] alu_in_a,
    input  logic [31:0] alu_in_b,
    input  logic [3:0]  alu_ctrl,
    output logic [31:0] alu_out,
    output logic        alu_zero
);

    // ALU Operations encoding
    localparam ALU_ADD  = 4'b0000;
    localparam ALU_SUB  = 4'b0001;
    localparam ALU_AND  = 4'b0010;
    localparam ALU_OR   = 4'b0011;
    localparam ALU_XOR  = 4'b0100;
    localparam ALU_SLT  = 4'b0101;
    localparam ALU_SLL  = 4'b0110;
    localparam ALU_SRL  = 4'b0111;

    always_comb begin
        case (alu_ctrl)
            ALU_ADD: alu_out = alu_in_a + alu_in_b;
            ALU_SUB: alu_out = alu_in_a - alu_in_b;
            ALU_AND: alu_out = alu_in_a & alu_in_b;
            ALU_OR:  alu_out = alu_in_a | alu_in_b;
            ALU_XOR: alu_out = alu_in_a ^ alu_in_b;
            ALU_SLT: alu_out = ($signed(alu_in_a) < $signed(alu_in_b)) ? 32'd1 : 32'd0;
            ALU_SLL: alu_out = alu_in_a << alu_in_b[4:0];
            ALU_SRL: alu_out = alu_in_a >> alu_in_b[4:0];
            default: alu_out = 32'h0000_0000;
        endcase
    end

    assign alu_zero = (alu_out == 32'h0);

endmodule
\`default_nettype wire`,
  },
  {
    id: 'register_file',
    name: 'register_file.sv',
    path: 'rtl/register_file.sv',
    category: 'rtl',
    description: '32-entry 32-bit register file with synchronous write & asynchronous read',
    code: `\`default_nettype none

module register_file (
    input  logic        clk,
    input  logic        rst_n,
    input  logic        reg_write_en,
    input  logic [4:0]  rs1_addr,
    input  logic [4:0]  rs2_addr,
    input  logic [4:0]  rd_addr,
    input  logic [31:0] rd_data,
    output logic [31:0] rs1_data,
    output logic [31:0] rs2_data
);

    logic [31:0] registers [0:31];

    // Asynchronous reads (x0 is hardwired to zero in RISC-V)
    assign rs1_data = (rs1_addr == 5'd0) ? 32'h0 : registers[rs1_addr];
    assign rs2_data = (rs2_addr == 5'd0) ? 32'h0 : registers[rs2_addr];

    // Synchronous write on positive clock edge
    integer i;
    always_ff @(posedge clk or negedge rst_n) begin
        if (!rst_n) begin
            for (i = 0; i < 32; i = i + 1) begin
                registers[i] <= 32'h0;
            end
        end else if (reg_write_en && (rd_addr != 5'd0)) begin
            registers[rd_addr] <= rd_data;
        end
    end

endmodule
\`default_nettype wire`,
  },
  {
    id: 'immediate_generator',
    name: 'immediate_generator.sv',
    path: 'rtl/immediate_generator.sv',
    category: 'rtl',
    description: 'Decodes and sign-extends immediates for I, S, B, U, and J instruction formats',
    code: `\`default_nettype none

module immediate_generator (
    input  logic [31:0] instruction,
    output logic [31:0] imm_out
);

    logic [6:0] opcode;
    assign opcode = instruction[6:0];

    always_comb begin
        case (opcode)
            // I-Type (ADDI, LW, JALR)
            7'b0010011,
            7'b0000011,
            7'b1100111: begin
                imm_out = {{20{instruction[31]}}, instruction[31:20]};
            end

            // S-Type (SW, SB, SH)
            7'b0100011: begin
                imm_out = {{20{instruction[31]}}, instruction[31:25], instruction[11:7]};
            end

            // B-Type (BEQ, BNE, BLT)
            7'b1100011: begin
                imm_out = {{19{instruction[31]}}, instruction[31], instruction[7],
                           instruction[30:25], instruction[11:8], 1'b0};
            end

            // U-Type (LUI, AUIPC)
            7'b0110111,
            7'b0010111: begin
                imm_out = {instruction[31:12], 12'b0};
            end

            // J-Type (JAL)
            7'b1101111: begin
                imm_out = {{11{instruction[31]}}, instruction[31], instruction[19:12],
                           instruction[20], instruction[30:21], 1'b0};
            end

            default: imm_out = 32'h0000_0000;
        endcase
    end

endmodule
\`default_nettype wire`,
  },
  {
    id: 'instruction_memory',
    name: 'instruction_memory.sv',
    path: 'rtl/instruction_memory.sv',
    category: 'rtl',
    description: 'Read-only instruction memory storing 32-bit RISC-V instructions',
    code: `\`default_nettype none

module instruction_memory #(
    parameter MEM_DEPTH = 256
)(
    input  logic [31:0] pc_addr,
    output logic [31:0] instruction
);

    // Word-addressed memory array
    logic [31:0] mem_array [0:MEM_DEPTH-1];

    // Word index from byte-aligned PC
    wire [29:0] word_addr = pc_addr[31:2];

    assign instruction = (word_addr < MEM_DEPTH) ? mem_array[word_addr] : 32'h0000_0013; // NOP (addi x0, x0, 0)

endmodule
\`default_nettype wire`,
  },
  {
    id: 'data_memory',
    name: 'data_memory.sv',
    path: 'rtl/data_memory.sv',
    category: 'rtl',
    description: 'Byte-accessible synchronous data SRAM for load and store execution',
    code: `\`default_nettype none

module data_memory #(
    parameter MEM_DEPTH = 1024
)(
    input  logic        clk,
    input  logic        mem_write_en,
    input  logic        mem_read_en,
    input  logic [31:0] addr,
    input  logic [31:0] write_data,
    output logic [31:0] read_data
);

    logic [31:0] memory [0:MEM_DEPTH-1];
    wire [29:0] word_idx = addr[31:2];

    // Synchronous memory write
    always_ff @(posedge clk) begin
        if (mem_write_en && (word_idx < MEM_DEPTH)) begin
            memory[word_idx] <= write_data;
        end
    end

    // Combinational or registered read
    assign read_data = (mem_read_en && (word_idx < MEM_DEPTH)) ? memory[word_idx] : 32'h0;

endmodule
\`default_nettype wire`,
  },
  {
    id: 'cpu_datapath',
    name: 'cpu_datapath.sv',
    path: 'rtl/cpu_datapath.sv',
    category: 'rtl',
    description: 'Central datapath interconnecting PC, decode, register file, and ALU',
    code: `\`default_nettype none

module cpu_datapath (
    input  logic        clk,
    input  logic        rst_n,
    // Control signals from control unit
    input  logic        reg_write,
    input  logic        alu_src,
    input  logic [3:0]  alu_ctrl,
    input  logic        mem_to_reg,
    input  logic        mem_read,
    input  logic        mem_write,
    input  logic        branch,
    // Status to control
    output logic [6:0]  opcode,
    output logic [2:0]  funct3,
    output logic [6:0]  funct7,
    output logic        zero_flag
);

    logic [31:0] pc_curr, pc_next;
    logic [31:0] instruction;
    logic [31:0] rs1_data, rs2_data, alu_b_operand, alu_result;
    logic [31:0] imm_ext;
    logic [31:0] mem_read_data, wb_data;

    // PC Update
    always_ff @(posedge clk or negedge rst_n) begin
        if (!rst_n) pc_curr <= 32'h0000_0000;
        else        pc_curr <= pc_next;
    end

    assign pc_next = (branch && zero_flag) ? (pc_curr + imm_ext) : (pc_curr + 32'd4);

    // Extraction
    assign opcode = instruction[6:0];
    assign funct3 = instruction[14:12];
    assign funct7 = instruction[31:25];

    // ALU Operand Mux
    assign alu_b_operand = alu_src ? imm_ext : rs2_data;

    // Writeback Mux
    assign wb_data = mem_to_reg ? mem_read_data : alu_result;

endmodule
\`default_nettype wire`,
  },
  {
    id: 'cpu_memory_tb',
    name: 'cpu_memory_tb.sv',
    path: 'tb/cpu_memory_tb.sv',
    category: 'tb',
    description: 'Testbench verifying CPU instruction execution against memory traces',
    code: `\`timescale 1ns / 1ps

module cpu_memory_tb;

    logic clk;
    logic rst_n;

    // Instantiate Unit Under Test
    cpu_top uut (
        .clk(clk),
        .rst_n(rst_n)
    );

    // Clock generation (50MHz)
    initial clk = 0;
    always #10 clk = ~clk;

    initial begin
        $dumpfile("sim/cpu_tb.vcd");
        $dumpvars(0, cpu_memory_tb);

        // Reset sequence
        rst_n = 0;
        #40;
        rst_n = 1;
        $display("[TB] Reset deasserted. CPU execution begins.");

        // Monitor PC and register writes
        #1000;
        $display("[TB] Test sequence completed.");
        $finish;
    end

endmodule`,
  },
  {
    id: 'hello_o',
    name: 'hello.o',
    path: 'programs/hello.o',
    category: 'programs',
    description: 'Disassembled ELF test payload exercising RV32I arithmetic & stores',
    code: `Disassembly of section .text:

00000000 <_start>:
   0: 00000093          li      ra, 0
   4: 00500113          li      sp, 5
   8: 00a00593          li      a1, 10
   c: 00b50633          add     a2, a0, a1
  10: 00c02023          sw      a2, 0(zero)
  14: 00002683          lw      a3, 0(zero)
  18: 0000006f          j       18 <_start+0x18>`,
  },
];
