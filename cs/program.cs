namespace System{
    class program {
        public void main(string[] arg) {
            Console.WriteLine("Type in the value");
            int a = Console.ReadLine();
            Console.WriteLine("Type in the value");
            int b = Console.ReadLine();

        }

        private static void Calculator(int a, int b)
        {
            int c = a + b;
            Console.WriteLine(c);
        }
    }
}
